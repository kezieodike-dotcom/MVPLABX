● Based on the full codebase, here is every remaining task grouped by priority:

  ---
  Phase 1 — Make It Actually Runnable (Do First)

  These are blockers — the app won't work end-to-end without them.

  ┌─────┬──────────────────────────────────────────────────────────────────────────────────────────────────────┬─────────────────────────────────────────────────────────────────────────────┐
  │  #  │                                                 Task                                                 │                              Why it's blocking                              │
  ├─────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────┤
  │ 1   │ Fill .env — add real DEEPGRAM_API_KEY                                                                │ Nothing transcribes without it                                              │
  ├─────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────┤
  │ 2   │ Install Rust crates — run cargo build inside src-tauri/ to pull enigo + tauri-plugin-global-shortcut │ App won't compile                                                           │
  ├─────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────┤
  │ 3   │ Test the full PTT loop — backend → Deepgram → WS → inject                                            │ Validates all 3 systems together                                            │
  ├─────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────┤
  │ 4   │ Fix ScriptProcessorNode → replace with AudioWorkletNode                                              │ Chrome/Electron prints warnings and may drop support; causes audio glitches │
  └─────┴──────────────────────────────────────────────────────────────────────────────────────────────────────┴─────────────────────────────────────────────────────────────────────────────┘

  ---
  Phase 2 — Auth & User Identity

  Without auth, you can't track usage, enforce limits, or charge users.

  ┌─────┬─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬─────────────────────────────────┐
  │  #  │                                                        Task                                                         │         File to create          │
  ├─────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────┤
  │ 5   │ Supabase database schema — write SQL migrations for profiles, devices, voice_sessions, usage_records, user_settings │ backend/migrations/001_init.sql │
  ├─────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────┤
  │ 6   │ JWT middleware — FastAPI dependency that verifies Supabase JWT on protected routes                                  │ backend/app/utils/auth.py       │
  ├─────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────┤
  │ 7   │ Auth routes — POST /auth/login, POST /auth/register, POST /auth/logout                                              │ backend/app/routes/auth.py      │
  ├─────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────┤
  │ 8   │ User route — GET /user/me returns profile                                                                           │ backend/app/routes/users.py     │
  ├─────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────┤
  │ 9   │ Protect /voice/stream — add JWT token as WS query param (?token=...) and verify on connect                          │ routes_ws/voice_stream.py       │
  ├─────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────┤
  │ 10  │ Login UI — email/password form in the desktop app, stores JWT in Tauri secure store                                 │ frontend/src/pages/Login.tsx    │
  └─────┴─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴─────────────────────────────────┘

  ---
  Phase 3 — Settings & Device Management

  Needed for a usable product.

  ┌─────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────┬──────────────────────────────────────────────────────┐
  │  #  │                                                    Task                                                    │                        Detail                        │
  ├─────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────┤
  │ 11  │ Settings routes — GET /settings, PUT /settings                                                             │ Hotkey, language, auto-punctuation, insert mode, mic │
  ├─────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────┤
  │ 12  │ Device registration — POST /devices/register, GET /devices — registers the machine on first launch         │ backend/app/routes/devices.py                        │
  ├─────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────┤
  │ 13  │ Settings UI page — lets user change hotkey, pick microphone, toggle punctuation, choose paste vs type mode │ frontend/src/pages/Settings.tsx                      │
  ├─────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────┤
  │ 14  │ Mic selector — enumerate navigator.mediaDevices.enumerateDevices() and let user pick input device          │ frontend/src/hooks/useMicDevices.ts                  │
  ├─────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────┤
  │ 15  │ Persist settings locally — save hotkey + mic preference to Tauri store so they survive restarts            │ frontend/src/store/settings.ts                       │
  ├─────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────┤
  │ 16  │ Dynamic hotkey — read hotkey from settings, re-register it in Rust instead of hardcoded Ctrl+Space         │ lib.rs + invoke("set_hotkey") command                │
  └─────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────┴──────────────────────────────────────────────────────┘

  ---
  Phase 4 — Usage Tracking & Billing Foundation

  Needed before you can monetise.

  ┌─────┬─────────────────────────────────────────────────────────────────────────────────────────┬───────────────────────────────────────┐
  │  #  │                                          Task                                           │                Detail                 │
  ├─────┼─────────────────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────┤
  │ 17  │ Usage service — calculates session duration + cost per minute, writes to usage_records  │ backend/app/services/usage_service.py │
  ├─────┼─────────────────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────┤
  │ 18  │ Log sessions — on WS close, write a voice_sessions row with duration, latency, provider │ routes_ws/voice_stream.py             │
  ├─────┼─────────────────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────┤
  │ 19  │ Usage route — GET /usage returns monthly minutes used and cost                          │ backend/app/routes/voice.py           │
  ├─────┼─────────────────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────┤
  │ 20  │ Free tier gate — reject /voice/stream if user has exceeded their monthly quota          │ JWT middleware + usage check          │
  └─────┴─────────────────────────────────────────────────────────────────────────────────────────┴───────────────────────────────────────┘

  ---
  Phase 5 — UX Polish

  Makes it feel like a real product.

  ┌─────┬──────────────────────────────────────────────────────────────────────────────────────────────┬────────────────────────────────────┐
  │  #  │                                             Task                                             │               Detail               │
  ├─────┼──────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────┤
  │ 21  │ System tray icon — app lives in the tray, not as a window; shows recording state             │ lib.rs + tauri-plugin-notification │
  ├─────┼──────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────┤
  │ 22  │ Mic level waveform — real-time audio amplitude bar in the overlay during recording           │ useVoiceStream.ts + CSS animation  │
  ├─────┼──────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────┤
  │ 23  │ Animated cursor blink — improve OverlayIndicator with a blinking cursor on partials          │ OverlayIndicator.tsx               │
  ├─────┼──────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────┤
  │ 24  │ "Text injected" toast — brief confirmation after text is typed at cursor                     │ frontend/src/components/Toast.tsx  │
  ├─────┼──────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────┤
  │ 25  │ Backend health check on startup — ping /health on launch, show warning if backend is offline │ App.tsx useEffect                  │
  ├─────┼──────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────┤
  │ 26  │ Window always-on-top — overlay window stays visible over other apps during recording         │ tauri.conf.json alwaysOnTop: true  │
  └─────┴──────────────────────────────────────────────────────────────────────────────────────────────┴────────────────────────────────────┘

  ---
  Phase 6 — Reliability & Security Hardening

  Required before public release.

  ┌─────┬────────────────────────────────────────────────────────────────────────────────────────────┬────────────────────────────────┐
  │  #  │                                            Task                                            │             Detail             │
  ├─────┼────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────┤
  │ 27  │ Rate limiting — add slowapi to FastAPI; limit /voice/stream to N connections per user      │ backend/app/main.py            │
  ├─────┼────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────┤
  │ 28  │ Error boundaries — React error boundary around the whole app so crashes show a friendly UI │ frontend/src/ErrorBoundary.tsx │
  ├─────┼────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────┤
  │ 29  │ Deepgram reconnect logic — auto-reconnect if the Deepgram WS drops mid-session             │ deepgram_service.py            │
  ├─────┼────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────┤
  │ 30  │ Input validation — Pydantic validation on all REST request bodies                          │ All route files                │
  ├─────┼────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────┤
  │ 31  │ Secret scanning — add .gitignore entries for .env, add detect-secrets pre-commit hook      │ repo root                      │
  ├─────┼────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────┤
  │ 32  │ HTTPS/WSS for production — configure TLS termination (nginx or Fly.io proxy)               │ deployment config              │
  └─────┴────────────────────────────────────────────────────────────────────────────────────────────┴────────────────────────────────┘

  ---
  Phase 7 — Tests

  No tests currently exist anywhere.

  ┌─────┬───────────────────────────────────────────────────────────────────────────────────────┬────────────────────────────────────┐
  │  #  │                                         Task                                          │               Detail               │
  ├─────┼───────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────┤
  │ 33  │ Backend unit tests — test DeepgramStreamSession, SupabaseService, auth middleware     │ backend/tests/ with pytest         │
  ├─────┼───────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────┤
  │ 34  │ WebSocket integration test — simulate audio stream, assert transcript events returned │ backend/tests/test_voice_stream.py │
  ├─────┼───────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────┤
  │ 35  │ Frontend component tests — test OverlayIndicator, useVoiceStream (mocked WS)          │ Vitest + Testing Library           │
  └─────┴───────────────────────────────────────────────────────────────────────────────────────┴────────────────────────────────────┘

  ---
  Phase 8 — Deployment & Distribution

  ┌─────┬───────────────────────────────────────────────────────────────────────────────────────────────────────┬─────────────────────────────────────────────────┐
  │  #  │                                                 Task                                                  │                     Detail                      │
  ├─────┼───────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────┤
  │ 36  │ Dockerfile — containerise the FastAPI backend                                                         │ backend/Dockerfile                              │
  ├─────┼───────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────┤
  │ 37  │ Deploy backend — push to Render / Railway / Fly.io, set env vars                                      │ Update DEFAULT_BACKEND_URL in useVoiceStream.ts │
  ├─────┼───────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────┤
  │ 38  │ Build desktop installer — npm run tauri build produces .exe (Windows), .dmg (macOS), AppImage (Linux) │ tauri.conf.json bundle config                   │
  ├─────┼───────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────┤
  │ 39  │ Auto-updater — configure tauri-plugin-updater so the app can self-update                              │ Cargo.toml + lib.rs                             │
  ├─────┼───────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────┤
  │ 40  │ GitHub Actions CI — lint + test on every PR for both backend (pytest) and frontend (vitest)           │ .github/workflows/ci.yml                        │
  └─────┴───────────────────────────────────────────────────────────────────────────────────────────────────────┴─────────────────────────────────────────────────┘

  ---
  Phase 9 — Future Features (Post-Launch)

  ┌─────┬───────────────────────────────────────────────────────────────────────────────────────────────┐
  │  #  │                                            Feature                                            │
  ├─────┼───────────────────────────────────────────────────────────────────────────────────────────────┤
  │ 41  │ Code mode — special transcription mode that outputs snake_case, adds brackets, etc.           │
  ├─────┼───────────────────────────────────────────────────────────────────────────────────────────────┤
  │ 42  │ AI voice commands — "delete line", "wrap in try-catch", "create function" via Claude API      │
  ├─────┼───────────────────────────────────────────────────────────────────────────────────────────────┤
  │ 43  │ VS Code extension — inject text directly via Language Server Protocol instead of keyboard sim │
  ├─────┼───────────────────────────────────────────────────────────────────────────────────────────────┤
  │ 44  │ Offline mode — local Whisper.cpp fallback when no internet                                    │
  ├─────┼───────────────────────────────────────────────────────────────────────────────────────────────┤
  │ 45  │ Multi-provider routing — failover between Deepgram → AssemblyAI → Whisper                     │
  ├─────┼───────────────────────────────────────────────────────────────────────────────────────────────┤
  │ 46  │ Team accounts — org billing, shared usage limits, admin dashboard                             │
  └─────┴───────────────────────────────────────────────────────────────────────────────────────────────┘

  ---
  Recommended Order to Start

  1 → 2 → 3    (verify the loop works NOW before building more)
  5 → 6 → 9    (auth — without it nothing is production-safe)
  11→ 13→ 16   (settings — makes it usable by real users)
  17→ 18→ 20   (usage tracking — required for any monetisation)
  21→ 25→ 26   (UX polish — tray icon + health check are high-impact, low effort)
  33→ 34       (tests — add as you go, not at the end)
  36→ 37→ 38   (ship it)