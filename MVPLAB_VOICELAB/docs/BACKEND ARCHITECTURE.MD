# Backend Architecture — Voice AI SaaS

**Stack:** Supabase + FastAPI + Deepgram

---

## Overview

This backend powers a real-time voice-to-text developer tool that converts speech into text and inserts it into user applications (IDE, browser, terminal, etc.).

Core responsibilities:

* Authentication & user management
* Real-time voice streaming
* Speech-to-text processing
* Usage tracking & billing preparation
* Device management
* Settings storage
* AI processing (future expansion)

The system uses:

* **Supabase** → database, auth, storage
* **FastAPI** → backend API layer
* **Deepgram** → real-time speech-to-text

---

## Architecture

```
Client (Desktop / Web)
        ↓
FastAPI Backend
        ↓
Supabase (DB + Auth + Storage)
        ↓
Deepgram Streaming API
```

---

## Technology Stack

### Backend Framework

* Python FastAPI

### Database & Auth

* Supabase PostgreSQL
* Supabase Auth (JWT)

### Speech Engine

* Deepgram Streaming Speech-to-Text

### Deployment

* Render / Railway / Fly.io / Docker

---

## Project Structure

```
backend/
│
├── app/
│   ├── main.py
│   ├── config.py
│   ├── dependencies.py
│   │
│   ├── routes/
│   │   ├── auth.py
│   │   ├── voice.py
│   │   ├── users.py
│   │   ├── devices.py
│   │   └── settings.py
│   │
│   ├── routes_ws/
│   │   └── voice_stream.py
│   │
│   ├── services/
│   │   ├── deepgram_service.py
│   │   ├── supabase_service.py
│   │   ├── voice_service.py
│   │   └── usage_service.py
│   │
│   ├── models/
│   │   ├── user.py
│   │   ├── voice_session.py
│   │   └── device.py
│   │
│   └── utils/
│       ├── auth.py
│       └── helpers.py
│
├── requirements.txt
└── README.md
```

---

## Environment Variables

```
SUPABASE_URL=
SUPABASE_KEY=
SUPABASE_JWT_SECRET=

DEEPGRAM_API_KEY=

DATABASE_URL=

APP_ENV=development
```

---

## Core Database Tables

### Users

Handled primarily by Supabase Auth.

Additional profile fields stored in `profiles` table.

---

### Devices

Tracks user devices.

```
id
user_id
device_name
os
app_version
last_active_at
created_at
```

---

### Voice Sessions

Each push-to-talk interaction.

```
id
user_id
device_id
duration_seconds
provider
latency_ms
created_at
```

---

### Usage Records

Tracks minutes and cost.

```
id
user_id
session_id
minutes_used
cost_usd
created_at
```

---

### User Settings

```
id
user_id
push_to_talk_key
language
auto_punctuation
insert_mode
microphone
created_at
```

---

## Authentication Flow

Authentication uses Supabase JWT tokens.

Flow:

```
Client → Supabase Auth → JWT
Client → Backend with JWT
Backend verifies JWT
Backend processes request
```

FastAPI dependency verifies token on protected routes.

---

## API Endpoints

### Health

```
GET /health
```

---

### User

```
GET /user/me
```

Returns current user profile.

---

### Devices

```
POST /devices/register
GET /devices
```

---

### Voice Transcription (Non-Streaming)

```
POST /voice/transcribe
```

Request:

```
multipart/form-data
audio file
device_id
language
```

Response:

```
{
  "text": "transcribed text",
  "latency_ms": 420
}
```

---

### Voice Streaming (Real-Time)

WebSocket endpoint:

```
WS /voice/stream
```

Flow:

```
Client opens WebSocket
Client streams audio chunks
Backend forwards to Deepgram
Deepgram returns partial transcripts
Backend sends text back to client
Client displays live text
```

This enables:

* Instant typing experience
* Sub-second latency
* Continuous transcription

---

### Settings

```
GET /settings
PUT /settings
```

---

## Voice Processing Flow (Streaming)

```
Client records microphone audio
        ↓
WebSocket → Backend
        ↓
Backend → Deepgram Streaming API
        ↓
Partial transcripts received
        ↓
Backend forwards to client
        ↓
Final transcript stored
        ↓
Usage recorded
```

---

## Deepgram Service Responsibilities

The speech service handles:

* WebSocket connection to Deepgram
* Audio chunk forwarding
* Partial transcript parsing
* Final transcript extraction
* Confidence scoring

Example responsibilities:

```
connect()
send_audio(chunk)
receive_transcript()
close()
```

---

## Usage Tracking

After each session:

1. Calculate audio duration
2. Estimate cost
3. Store usage record
4. Associate with user session

This enables:

* Billing
* Free tier limits
* Analytics

---

## Security

* JWT authentication required
* HTTPS/WSS only
* API key protection
* Rate limiting recommended
* Audio not stored by default
* Optional transcript storage

---

## Deployment

### Development

uvicorn app.main:app --reload
```

### Production

Docker recommended.
docker build .
docker run
```

Deploy options:

* Render
* Railway
* Fly.io
* AWS

---

## Scaling Strategy

Early stage:

* Single backend instance
* Supabase hosted
* Deepgram cloud

Growth stage:

* Redis caching
* Queue workers
* Multi-region deployment
* Provider fallback support

Advanced stage:

* Multi speech providers
* Local transcription fallback
* Edge streaming nodes

---

## Future Features

### AI Commands

Examples:

* “delete this line”
* “create function”
* “wrap in try catch”

### Code Intelligence

Integration with LLM providers for:

* Refactoring
* Auto completion
* Documentation

### Team Accounts

Organization billing and shared usage.

### Offline Mode

Local speech model fallback.

---

## Recommended Providers

Speech-to-Text:

* Deepgram

Database & Auth:

* Supabase

Backend Framework:

* FastAPI

---

## Development Phases

### Phase 1 — MVP

* Auth
* Streaming transcription
* Device registration
* Usage tracking

### Phase 2 — Product

* Settings UI
* AI commands
* Quotas & billing
* Latency optimization

### Phase 3 — Scale

* Teams
* Offline mode
* Multi-provider routing

---

## Key Principle

Start simple:

> Real-time transcription + excellent UX beats complex architecture.

---

## Notes

This backend is designed to support both:

* Personal productivity tool
* Scalable SaaS startup

Minimal architectural changes required to scale globally.

---
