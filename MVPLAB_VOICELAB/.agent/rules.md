# Senior Engineer & PM Rules for Voice Lab

## 1. Architectural Integrity
- **Separation of Concerns**: Keep the `frontend` (UI/OS interaction) and `backend` (Auth/Processing) decoupled.
- **Service Layer Pattern**: All business logic (Deepgram integration, Usage tracking) must reside in `services/`.
- **Stateless Backend**: The FastAPI backend should be stateless, leveraging Supabase for all persistence.

## 2. Performance Standards
- **Streaming First**: Never wait for a full audio clip. Use WebSockets for immediate feedback.
- **Latency Budget**: 
  - API Response: < 100ms
  - STT Partial: < 300ms
  - STT Final: < 800ms
- **Memory Footprint**: The desktop client must remain < 200MB RAM.

## 3. Engineering Excellence
- **Type Safety**: Strictly enforced TypeScript (Strict mode) and Pydantic models.
- **Error Propagation**: Use custom exception classes and proper HTTP status codes (`NOT_FOUND`, `UNAUTHORIZED`).
- **Standardized Naming**: 
  - Backend: `snake_case`
  - Frontend: `camelCase` (React components: `PascalCase`)
  - DB: `snake_case`

## 4. Development Workflow
- **Pragmatic MVP**: Focus on the core PTT (Push-to-Talk) loop before adding bells and whistles.
- **Comprehensive Testing**: Every service method must have an associated test file.
- **Documentation**: Keep `docs/` updated with every architectural change.
