import os
import hashlib
import aiofiles
from fastapi import UploadFile
from app.core.config import settings
from app.core.exceptions import ValidationException

class StorageService:
    @staticmethod
    def ensure_storage_dirs():
        os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
        os.makedirs(settings.STORAGE_DIR, exist_ok=True)

    @staticmethod
    async def save_uploaded_file(file: UploadFile) -> tuple[str, str, int]:
        """
        Saves uploaded file to disk, computes SHA-256 hash, and returns (file_path, file_hash, size_bytes).
        """
        StorageService.ensure_storage_dirs()

        filename = file.filename or "uploaded_report"
        ext = filename.split(".")[-1].lower() if "." in filename else ""
        if ext not in settings.ALLOWED_EXTENSIONS:
            raise ValidationException(f"Unsupported file format '{ext}'. Allowed: {', '.join(settings.ALLOWED_EXTENSIONS)}")

        content = await file.read()
        size_bytes = len(content)
        max_bytes = settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024
        if size_bytes > max_bytes:
            raise ValidationException(f"File size exceeds maximum allowed limit of {settings.MAX_UPLOAD_SIZE_MB}MB")

        sha256 = hashlib.sha256(content).hexdigest()
        stored_filename = f"{sha256[:16]}_{filename}"
        target_path = os.path.join(settings.UPLOAD_DIR, stored_filename)

        async with aiofiles.open(target_path, "wb") as f:
            await f.write(content)

        # Reset pointer
        await file.seek(0)

        return target_path, sha256, size_bytes
