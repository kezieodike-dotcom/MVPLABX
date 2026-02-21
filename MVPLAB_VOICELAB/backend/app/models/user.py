from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    password: Optional[str] = None

class User(UserBase):
    id: str
    created_at: datetime
    last_login: Optional[datetime] = None

    class Config:
        from_attributes = True

class Profile(BaseModel):
    user_id: str
    push_to_talk_key: str = "ctrl"
    language: str = "en-US"
    auto_punctuation: bool = True
    insert_mode: str = "type"  # "type" or "paste"
    microphone: Optional[str] = None
