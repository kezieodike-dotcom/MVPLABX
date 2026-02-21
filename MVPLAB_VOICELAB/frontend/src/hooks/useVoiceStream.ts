import { useCallback, useRef, useState } from "react";

// ─── Public types ────────────────────────────────────────────────────────────

export type TranscriptEvent =
  | { type: "partial"; text: string; confidence: number }
  | { type: "final"; text: string; confidence: number }
  | { type: "error"; text: string };

interface UseVoiceStreamOptions {
  /** WebSocket URL of the backend /voice/stream endpoint */
  backendUrl?: string;
  /** Mic sample rate — must match backend Deepgram config */
  sampleRate?: number;
  onTranscript: (event: TranscriptEvent) => void;
}

interface UseVoiceStreamReturn {
  isStreaming: boolean;
  startStreaming: () => Promise<void>;
  stopStreaming: () => Promise<void>;
  error: string | null;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const DEFAULT_BACKEND_URL = "ws://127.0.0.1:8000/voice/stream";
const AUDIO_BUFFER_SIZE = 4096; // ScriptProcessor buffer (frames)

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Captures microphone audio, streams PCM-16 chunks over a WebSocket to the
 * FastAPI backend, and surfaces partial/final transcript events.
 *
 * Audio pipeline:
 *   MediaStream → AudioContext → ScriptProcessorNode → Float32→Int16 → WebSocket
 *
 * Note: ScriptProcessorNode is deprecated but has universal support.
 * Replace with an AudioWorkletNode for production hardening.
 */
export function useVoiceStream({
  backendUrl = DEFAULT_BACKEND_URL,
  sampleRate = 16000,
  onTranscript,
}: UseVoiceStreamOptions): UseVoiceStreamReturn {
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Refs avoid stale closures inside async callbacks
  const wsRef = useRef<WebSocket | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const onTranscriptRef = useRef(onTranscript);
  onTranscriptRef.current = onTranscript;

  // ── startStreaming ──────────────────────────────────────────────────────────

  const startStreaming = useCallback(async () => {
    setError(null);

    // 1. Request mic access
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
    } catch (err) {
      const msg =
        err instanceof DOMException && err.name === "NotAllowedError"
          ? "Microphone permission denied"
          : err instanceof Error
            ? err.message
            : "Failed to access microphone";
      setError(msg);
      return;
    }

    // 2. Connect WebSocket
    const ws = new WebSocket(backendUrl);
    ws.binaryType = "arraybuffer";

    try {
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(
          () => reject(new Error("Backend connection timed out")),
          6000,
        );
        ws.onopen = () => {
          clearTimeout(timeout);
          resolve();
        };
        ws.onerror = () => {
          clearTimeout(timeout);
          reject(new Error("Cannot reach Voice Lab backend (ws://127.0.0.1:8000)"));
        };
      });
    } catch (err) {
      stream.getTracks().forEach((t) => t.stop());
      setError(err instanceof Error ? err.message : "Connection failed");
      return;
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data as string) as TranscriptEvent;
        onTranscriptRef.current(data);
      } catch {
        // Ignore malformed frames — don't crash the session
      }
    };

    ws.onerror = () => setError("WebSocket error during streaming");
    ws.onclose = () => setIsStreaming(false);

    // 3. Build audio pipeline: MediaStream → PCM-16 → WebSocket
    const audioCtx = new AudioContext({ sampleRate });
    const source = audioCtx.createMediaStreamSource(stream);
    const processor = audioCtx.createScriptProcessor(AUDIO_BUFFER_SIZE, 1, 1);

    processor.onaudioprocess = (e: AudioProcessingEvent) => {
      if (ws.readyState !== WebSocket.OPEN) return;
      const float32 = e.inputBuffer.getChannelData(0);
      const pcm16 = float32ToPcm16(float32);
      ws.send(pcm16.buffer);
    };

    source.connect(processor);
    processor.connect(audioCtx.destination);

    // Store refs for cleanup
    wsRef.current = ws;
    streamRef.current = stream;
    processorRef.current = processor;
    audioCtxRef.current = audioCtx;

    setIsStreaming(true);
  }, [backendUrl, sampleRate]);

  // ── stopStreaming ───────────────────────────────────────────────────────────

  const stopStreaming = useCallback(async () => {
    // Signal end-of-stream to backend before closing
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send("stop");
      // Give the backend ~300 ms to flush remaining Deepgram audio
      await new Promise<void>((r) => setTimeout(r, 300));
      wsRef.current.close();
    }

    // Teardown audio pipeline
    processorRef.current?.disconnect();
    await audioCtxRef.current?.close();
    streamRef.current?.getTracks().forEach((t) => t.stop());

    wsRef.current = null;
    processorRef.current = null;
    audioCtxRef.current = null;
    streamRef.current = null;

    setIsStreaming(false);
  }, []);

  return { isStreaming, startStreaming, stopStreaming, error };
}

// ─── Utility ─────────────────────────────────────────────────────────────────

/**
 * Convert Float32 PCM samples [-1, 1] to signed Int16 PCM.
 * Deepgram expects linear16 encoding.
 */
function float32ToPcm16(input: Float32Array): Int16Array {
  const out = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const clamped = Math.max(-1, Math.min(1, input[i]));
    out[i] = clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff;
  }
  return out;
}
