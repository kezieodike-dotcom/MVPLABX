# Implementation Guide — Core PTT Loop

> Status: **Implemented** (Feb 2026)
> Features: Voice Streaming · Global Hotkey · Cursor Injection

---

## What Was Built

Three interdependent sub-systems that together form the push-to-talk loop:

```
[User holds Ctrl+Space]
        │
        ▼
  Rust (lib.rs)
  global-shortcut fires
  emits "ptt-start" event
        │
        ▼
  React (useHotkey.ts)
  receives "ptt-start"
  calls handleStart()
        │
        ▼
  React (useVoiceStream.ts)
  1. getUserMedia() — mic
  2. new WebSocket(ws://127.0.0.1:8000/voice/stream)
  3. ScriptProcessorNode → Float32→Int16 → ws.send(binary)
        │
        ▼
  FastAPI (voice_stream.py)
  WebSocket /voice/stream
  receives binary PCM frames
        │
        ▼
  Python (deepgram_service.py)
  DeepgramStreamSession
  forwards chunks to Deepgram nova-2
  receives partial + final transcripts
        │
        ▼
  FastAPI → WebSocket → React
  { type: "partial"|"final", text: "...", confidence: 0.97 }
        │
        ▼
  React (App.tsx)
  OverlayIndicator shows live text
  finalTextRef accumulates last final

[User releases Ctrl+Space]
        │
        ▼
  Rust emits "ptt-stop"
  React calls handleStop()
  stopStreaming() → sends "stop" to WS → session.finish()
  invoke("inject_text", { text: finalText })
        │
        ▼
  Rust inject_text command
  enigo.text(&text)
  → types text at OS cursor (VS Code, terminal, browser, etc.)
```

---

## File Map

| File | Role |
|------|------|
| `backend/app/services/deepgram_service.py` | Deepgram live session wrapper |
| `backend/app/routes_ws/voice_stream.py` | FastAPI WebSocket bridge |
| `backend/app/main.py` | App wiring + secure CORS |
| `frontend/src/hooks/useVoiceStream.ts` | Mic capture + WS client |
| `frontend/src/hooks/useHotkey.ts` | Listens for Rust PTT events |
| `frontend/src/App.tsx` | Orchestrates the full loop |
| `frontend/src-tauri/src/lib.rs` | Global shortcut + inject_text |
| `frontend/src-tauri/Cargo.toml` | Adds enigo + global-shortcut |
| `frontend/src-tauri/capabilities/default.json` | Tauri 2 capability grants |

---

## Running the Stack

### 1. Backend

```bash
cd backend
# First time: create venv and install
python -m venv .venv
.venv\Scripts\activate          # Windows
pip install -r requirements.txt

# Configure
cp .env.example .env             # fill in DEEPGRAM_API_KEY

# Start
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

### 2. Frontend (Tauri)

```bash
cd frontend
npm install
npm run tauri dev
```

Tauri will compile Rust, start Vite, and launch the app.

---

## Audio Format

| Parameter | Value | Why |
|-----------|-------|-----|
| Encoding | PCM-16 LE | Deepgram `linear16` |
| Channels | 1 (mono) | Reduces bandwidth 50 % |
| Sample rate | 16 000 Hz | Optimal for speech; Deepgram default |
| Chunk interval | ~4096 frames / 16 kHz ≈ 256 ms | ScriptProcessor buffer |

---

## Security Notes

- CORS restricted to Tauri origins only (`tauri://localhost`, `http://localhost:1420`).
- `ws://127.0.0.1:8000` — loopback only; no public exposure.
- CSP in `tauri.conf.json` locks `connect-src` to the backend origin.
- `DEEPGRAM_API_KEY` stays server-side; never sent to the frontend.
- Backend docs UI (`/docs`) is disabled in production (`APP_ENV != development`).

---

## Known Limitations & Next Steps

| Limitation | Fix |
|---|---|
| `ScriptProcessorNode` is deprecated | Replace with `AudioWorkletNode` |
| Ctrl+Space conflicts with VS Code autocomplete | Make hotkey user-configurable (Settings UI) |
| Text injection is synchronous (blocks Rust thread) | Run `enigo` in `tokio::task::spawn_blocking` |
| No JWT auth on `/voice/stream` | Add `Authorization` header check (Phase 2) |
| No usage tracking per session | Implement `UsageService` and log to Supabase |

---

## Deepgram SDK Notes

- Uses **deepgram-sdk 3.x** async live API: `client.listen.asynclive.v("1")`
- Model: `nova-2` — best accuracy/latency balance
- `interim_results=True` → powers the live partial transcript overlay
- `smart_format=True` → handles numbers, punctuation automatically
- SDK callback signature: `async def handler(self_conn, result, **kwargs)`

---

## Rust Crate Notes

### enigo 0.2

```rust
let mut enigo = Enigo::new(&Settings::default())?;
enigo.text("hello world")?;   // types at current OS cursor
```

Supports Windows, macOS, Linux (X11/Wayland).

### tauri-plugin-global-shortcut 2

Shortcuts registered in Rust via `Builder::with_handler`.
Fires even when Voice Lab window is not focused — essential for PTT.
Events emitted via `app.emit("ptt-start", ())` reach all JS `listen()` subscribers.
