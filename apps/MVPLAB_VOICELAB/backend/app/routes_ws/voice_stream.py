import asyncio
import logging

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.services.deepgram_service import DeepgramStreamSession

logger = logging.getLogger(__name__)

router = APIRouter()


@router.websocket("/stream")
async def voice_stream(websocket: WebSocket) -> None:
    """
    WebSocket bridge: mic audio (client) → Deepgram → transcript events (client).

    Binary protocol (client → server):
      • Binary frames : raw PCM-16 LE, mono, 16 kHz audio chunks
      • Text frame    : "stop" — signals end of recording

    JSON protocol (server → client):
      • { "type": "partial", "text": "...", "confidence": 0.92 }
      • { "type": "final",   "text": "...", "confidence": 0.97 }
      • { "type": "error",   "text": "<reason>" }
    """
    await websocket.accept()
    session = DeepgramStreamSession()

    try:
        await session.start()
    except RuntimeError as exc:
        await websocket.send_json({"type": "error", "text": str(exc)})
        await websocket.close()
        return

    async def receive_audio() -> None:
        """Read frames from the client and forward audio bytes to Deepgram."""
        try:
            while True:
                message = await websocket.receive()

                if message["type"] == "websocket.disconnect":
                    break

                raw_bytes: bytes | None = message.get("bytes")
                raw_text: str | None = message.get("text")

                if raw_bytes:
                    await session.send_audio(raw_bytes)
                elif raw_text == "stop":
                    break
        finally:
            await session.finish()

    async def forward_transcripts() -> None:
        """Read transcripts from Deepgram and push them to the client."""
        async for msg in session.transcripts():
            payload = {
                "type": "final" if msg.is_final else "partial",
                "text": msg.text,
                "confidence": msg.confidence,
            }
            try:
                await websocket.send_json(payload)
            except Exception:
                break  # client disconnected mid-stream

    try:
        await asyncio.gather(receive_audio(), forward_transcripts())
    except WebSocketDisconnect:
        logger.info("Client disconnected cleanly from /voice/stream")
    except Exception as exc:
        logger.error("Unexpected error in /voice/stream: %s", exc)
        try:
            await websocket.send_json({"type": "error", "text": str(exc)})
        except Exception:
            pass
    finally:
        await session.finish()
        logger.info("Voice stream session closed")
