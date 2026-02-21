from supabase import create_client, Client
from app.config import settings

class SupabaseService:
    def __init__(self):
        self.url = settings.SUPABASE_URL
        self.key = settings.SUPABASE_KEY
        self.client: Client = create_client(self.url, self.key)

    def get_user_profile(self, user_id: str):
        return self.client.table("profiles").select("*").eq("user_id", user_id).single().execute()

    def update_user_settings(self, user_id: str, settings_data: dict):
        return self.client.table("profiles").update(settings_data).eq("user_id", user_id).execute()

    def log_voice_session(self, session_data: dict):
        return self.client.table("voice_sessions").insert(session_data).execute()

supabase_service = SupabaseService()
