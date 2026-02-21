1️⃣ WebSocket Streaming Example

(FastAPI → Deepgram → Client)

Install Dependencies
pip install fastapi uvicorn websockets python-dotenv deepgram-sdk

voice_stream.py
import asyncio
import json
from fastapi import WebSocket, APIRouter
from deepgram import DeepgramClient, LiveTranscriptionEvents
import os

router = APIRouter()

DEEPGRAM_API_KEY = os.getenv("DEEPGRAM_API_KEY")


@router.websocket("/voice/stream")
async def voice_stream(websocket: WebSocket):
    await websocket.accept()

    dg_client = DeepgramClient(DEEPGRAM_API_KEY)

    connection = dg_client.listen.websocket.v("1")

    async def on_message(result, **kwargs):
        transcript = result.channel.alternatives[0].transcript
        if transcript:
            await websocket.send_text(
                json.dumps({
                    "type": "transcript",
                    "text": transcript,
                    "is_final": result.is_final
                })
            )

    connection.on(LiveTranscriptionEvents.Transcript, on_message)

    await connection.start({
        "model": "nova-2",
        "language": "en-US",
        "smart_format": True,
        "punctuate": True,
    })

    try:
        while True:
            data = await websocket.receive_bytes()
            await connection.send(data)

    except Exception:
        pass
    finally:
        await connection.finish()

2️⃣ Supabase SQL Schema (Production Ready MVP)

Run inside Supabase SQL editor.

-- USERS PROFILE
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamp default now()
);

-- DEVICES
create table devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  device_name text,
  os text,
  app_version text,
  last_active_at timestamp,
  created_at timestamp default now()
);

-- USER SETTINGS
create table user_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  push_to_talk_key text default 'ctrl+space',
  language text default 'en',
  auto_punctuation boolean default true,
  insert_mode text default 'paste',
  microphone text,
  created_at timestamp default now()
);

-- VOICE SESSIONS
create table voice_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  device_id uuid references devices(id),
  duration_seconds int,
  latency_ms int,
  provider text default 'deepgram',
  created_at timestamp default now()
);

-- USAGE RECORDS
create table usage_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  session_id uuid references voice_sessions(id),
  minutes_used float,
  cost_usd float,
  created_at timestamp default now()
);

-- ENABLE ROW LEVEL SECURITY
alter table profiles enable row level security;
alter table devices enable row level security;
alter table user_settings enable row level security;
alter table voice_sessions enable row level security;
alter table usage_records enable row level security;

3️⃣ Desktop Client Architecture

Best choice:

Python desktop client (fastest MVP)

Later you can move to Tauri/Electron.

Desktop Flow
Keyboard Hotkey Pressed
        ↓
Start Microphone Recording
        ↓
Stream Audio → Backend WebSocket
        ↓
Receive Transcript
        ↓
Insert Into Cursor

Core Desktop Components
Modules
desktop/
  audio/
  websocket/
  hotkey/
  typing/
  ui/

Responsibilities

Hotkey Listener:

Detect press & hold key

Audio Recorder:

Capture microphone PCM stream

WebSocket Client:

Send audio chunks

Receive transcripts

Text Injector:

Type into cursor (pyautogui)

UI Overlay:

Status indicator

Recording animation

Python Libraries
pyaudio
websockets
pyautogui
pynput
sounddevice
numpy

4️⃣ Full MVP Repository Structure

This is a startup-grade structure.

voice-ai/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   │   ├── voice.py
│   │   │   ├── users.py
│   │   │   └── devices.py
│   │   │
│   │   ├── routes_ws/
│   │   │   └── voice_stream.py
│   │   │
│   │   ├── services/
│   │   │   ├── deepgram_service.py
│   │   │   ├── supabase_service.py
│   │   │   └── usage_service.py
│   │   │
│   │   └── utils/
│   │       └── auth.py
│   │
│   ├── requirements.txt
│   └── Dockerfile
│
├── desktop/
│   ├── main.py
│   │
│   ├── audio/
│   │   └── recorder.py
│   │
│   ├── websocket/
│   │   └── client.py
│   │
│   ├── hotkey/
│   │   └── listener.py
│   │
│   ├── typing/
│   │   └── injector.py
│   │
│   └── ui/
│       └── overlay.py
│
├── supabase/
│   └── schema.sql
│
├── docs/
│   ├── architecture.md
│   └── api.md
│
└── README.md

🚀 MVP Development Order (Very Important)

Follow this exact order:

Step 1

Backend WebSocket + Deepgram working

Step 2

Desktop microphone streaming

Step 3

Receive transcript in console

Step 4

Inject text into cursor

Step 5

Add hotkey trigger

Step 6

Add Supabase auth + tracking

Now you have a product.

⚡ Latency Optimization Tips

To feel like WhisperFlow:

16kHz mono audio

Small audio chunks (20–40ms)

Persistent WebSocket

Avoid file uploads

Stream continuously

🧠 Pro Upgrade Later

You can add:

AI rewrite

Voice commands for coding

VS Code extension

Cursor IDE plugin

Offline mode