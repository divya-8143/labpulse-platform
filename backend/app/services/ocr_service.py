import os
import logging
from typing import Tuple, List
import pdfplumber
from pypdf import PdfReader
from PIL import Image

logger = logging.getLogger(__name__)

class OCRService:
    @staticmethod
    def extract_text(file_path: str) -> Tuple[str, List[str]]:
        """
        Extracts raw text and tabular sections from PDF or Image file.
        Returns: (full_text, pages_text_list)
        """
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File not found: {file_path}")

        ext = file_path.split(".")[-1].lower()
        if ext == "pdf":
            return OCRService._extract_from_pdf(file_path)
        elif ext in ["png", "jpg", "jpeg", "tiff", "webp"]:
            return OCRService._extract_from_image(file_path)
        else:
            return "", []

    @staticmethod
    def _extract_from_pdf(file_path: str) -> Tuple[str, List[str]]:
        pages_text = []
        full_text_chunks = []

        try:
            with pdfplumber.open(file_path) as pdf:
                for i, page in enumerate(pdf.pages):
                    page_text = page.extract_text(layout=True) or ""
                    
                    # Extract tables if present
                    tables = page.extract_tables()
                    table_text_chunk = ""
                    if tables:
                        for table in tables:
                            for row in table:
                                if row:
                                    clean_row = [str(col).strip() for col in row if col is not None]
                                    table_text_chunk += " | ".join(clean_row) + "\n"
                    
                    combined_page = page_text + "\n" + table_text_chunk
                    pages_text.append(combined_page)
                    full_text_chunks.append(combined_page)
        except Exception as e:
            logger.warning(f"pdfplumber extraction encountered error: {e}. Falling back to pypdf.")
            try:
                reader = PdfReader(file_path)
                for page in reader.pages:
                    txt = page.extract_text() or ""
                    pages_text.append(txt)
                    full_text_chunks.append(txt)
            except Exception as fallback_e:
                logger.error(f"pypdf fallback failed: {fallback_e}")

        full_text = "\n--- PAGE BREAK ---\n".join(full_text_chunks)
        return full_text, pages_text

    @staticmethod
    def _extract_from_image(file_path: str) -> Tuple[str, List[str]]:
        try:
            import pytesseract
            img = Image.open(file_path)
            # Basic preprocessing (convert to grayscale)
            gray = img.convert('L')
            text = pytesseract.image_to_string(gray)
            return text, [text]
        except Exception as e:
            logger.warning(f"pytesseract image OCR failed (is tesseract installed?): {e}")
            return "Image uploaded. Tesseract OCR fallback.", ["Image uploaded. Tesseract OCR fallback."]
