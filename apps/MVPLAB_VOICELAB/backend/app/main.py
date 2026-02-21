import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routes_ws.voice_stream import router as voice_stream_router

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(name)s — %(message)s",
)
logger = logging.getLogger(__name__)

# Allowed origins — Tauri dev server + production bundle origins.
# Never allow "*" — that exposes the backend to any web page.
_ALLOWED_ORIGINS: list[str] = [
    "http://localhost:1420",    # Tauri dev (Vite)
    "tauri://localhost",         # Tauri production bundle (Windows / Linux)
    "https://tauri.localhost",   # Tauri production bundle (macOS)
]

app = FastAPI(
    title="Voice Lab API",
    description="Backend for real-time voice-to-text developer tool",
    version="0.1.0",
    # Disable docs in production to reduce attack surface
    docs_url="/docs" if settings.APP_ENV == "development" else None,
    redoc_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=_ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

# --- Routers ---
app.include_router(voice_stream_router, prefix="/voice", tags=["voice"])


@app.get("/health", tags=["system"])
async def health_check() -> dict:
    return {
        "status": "healthy",
        "version": "0.1.0",
        "env": settings.APP_ENV,
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="127.0.0.1",  # localhost only — never expose to 0.0.0.0 in dev
        port=8000,
        reload=True,
    )
