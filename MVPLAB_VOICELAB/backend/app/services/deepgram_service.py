import asyncio
import logging
from typing import AsyncGenerator, Optional

from deepgram import (
    DeepgramClient,
    DeepgramClientOptions,
    LiveOptions,
    LiveTranscriptionEvents,
)

from app.config import settings

logger = logging.getLogger(__name__)


class TranscriptMessage:
    __slots__ = ("text", "is_final", "confidence")

    def __init__(self, text: str, is_final: bool, confidence: float = 0.0) -> None:
        self.text = text
        self.is_final = is_final
        self.confidence = confidence


class DeepgramStreamSession:
    """
    Manages one live transcription session with Deepgram.
    Bridges raw PCM-16 audio bytes in → TranscriptMessage objects out.

    Usage:
        session = DeepgramStreamSession()
        await session.start()
        await session.send_audio(chunk)  # repeat
        await session.finish()
        async for msg in session.transcripts():
            ...
    """

    def __init__(self) -> None:
        if not settings.DEEPGRAM_API_KEY:
            raise RuntimeError(
                "DEEPGRAM_API_KEY is not configured. Set it in backend/.env"
            )
        self._client = DeepgramClient(
            settings.DEEPGRAM_API_KEY,
            DeepgramClientOptions(verbose=False),
        )
        self._connection = None
        self._queue: asyncio.Queue[Optional[TranscriptMessage]] = asyncio.Queue()
        self._connected = False

    async def start(
        self,
        language: str = "en-US",
        model: str = "nova-2",
        punctuate: bool = True,
        sample_rate: int = 16000,
    ) -> None:
        """Open a live Deepgram connection and register event handlers."""
        self._connection = self._client.listen.asynclive.v("1")

        # Capture outer self in closure
        queue = self._queue

        async def on_transcript(self_inner, result, **kwargs) -> None:  # noqa: ARG001
            try:
                alt = result.channel.alternatives[0]
                text: str = alt.transcript.strip()
                if not text:
                    return
                confidence: float = getattr(alt, "confidence", 0.0) or 0.0
                await queue.put(
                    TranscriptMessage(
                        text=text,
                        is_final=bool(result.is_final),
                        confidence=round(confidence, 3),
                    )
                )
            except Exception as exc:
                logger.error("Error parsing Deepgram transcript: %s", exc)

        async def on_error(self_inner, error, **kwargs) -> None:  # noqa: ARG001
            logger.error("Deepgram error: %s", error)
            await queue.put(None)  # sentinel → signal failure downstream

        self._connection.on(LiveTranscriptionEvents.Transcript, on_transcript)
        self._connection.on(LiveTranscriptionEvents.Error, on_error)

        options = LiveOptions(
            model=model,
            language=language,
            punctuate=punctuate,
            encoding="linear16",
            channels=1,
            sample_rate=sample_rate,
            interim_results=True,
            smart_format=True,
        )

        started: bool = await self._connection.start(options)
        if not started:
            raise RuntimeError("Failed to open Deepgram live connection")

        self._connected = True
        logger.info("Deepgram session started (model=%s, lang=%s)", model, language)

    async def send_audio(self, chunk: bytes) -> None:
        """Forward a raw PCM-16 audio chunk to Deepgram."""
        if not self._connected or self._connection is None:
            raise RuntimeError("DeepgramStreamSession is not started")
        await self._connection.send(chunk)

    async def finish(self) -> None:
        """Signal end-of-audio and close the Deepgram connection."""
        if self._connection and self._connected:
            try:
                await self._connection.finish()
            except Exception as exc:
                logger.warning("Error closing Deepgram connection: %s", exc)
            finally:
                self._connected = False
        # Push sentinel so the transcripts() generator can exit cleanly
        await self._queue.put(None)

    async def transcripts(self) -> AsyncGenerator[TranscriptMessage, None]:
        """Async generator yielding transcript messages until stream ends."""
        while True:
            msg = await self._queue.get()
            if msg is None:
                break
            yield msg
