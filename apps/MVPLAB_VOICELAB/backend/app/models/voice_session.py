from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class VoiceSessionBase(BaseModel):
    device_id: str
    language: str = "en-US"
    provider: str = "deepgram"

class VoiceSessionCreate(VoiceSessionBase):
    pass

class VoiceSession(VoiceSessionBase):
    id: str
    user_id: str
    duration_seconds: Optional[float] = 0
    latency_ms: Optional[int] = 0
    created_at: datetime

    class Config:
        from_attributes = True

class UsageRecord(BaseModel):
    id: str
    user_id: str
    session_id: str
    minutes_used: float
    cost_usd: float
    created_at: datetime
