from typing import List, Union
from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl, validator

class Settings(BaseSettings):
    PROJECT_NAME: str = "LabPulse Platform"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "labpulse-production-grade-encryption-secret-key-medical-ai-2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day for demo convenience
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "http://localhost:8000"
    ]

    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./labpulse.db"
    DATABASE_ECHO: bool = False

    # Redis & Background Workers
    REDIS_URL: str = "redis://localhost:6379/0"
    CELERY_BROKER_URL: str = "redis://localhost:6379/0"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/0"

    # AI & OCR Extraction Settings
    LLM_PROVIDER: str = "fallback"  # openai | anthropic | ollama | fallback
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL_NAME: str = "gpt-4o-mini"
    ANTHROPIC_API_KEY: str = ""
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    TESSERACT_CMD: str = "tesseract"
    OCR_CONFIDENCE_THRESHOLD: float = 60.0

    # Storage & Uploads
    UPLOAD_DIR: str = "./uploads"
    STORAGE_DIR: str = "./storage"
    MAX_UPLOAD_SIZE_MB: int = 25
    ALLOWED_EXTENSIONS: List[str] = ["pdf", "png", "jpg", "jpeg", "tiff", "webp"]

    # Medical & Non-Diagnostic Compliance
    ENFORCE_STRICT_DISCLAIMER: bool = True
    ALLOW_SYNTHETIC_SEEDING: bool = True

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
