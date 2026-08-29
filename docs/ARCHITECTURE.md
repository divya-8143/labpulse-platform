# LabPulse Platform — System Architecture & Technical Specification

## 1. High-Level Architectural Model

LabPulse Platform is designed following a **Clean Modular Architecture** prioritizing decoupled extraction engines, deterministic reference intervals, time-series data modeling, and strict role-based access security.

```
+-------------------------------------------------------------------------+
|                              Web Frontend                               |
|              (React 18 + Vite + TypeScript + Tailwind CSS)              |
+-------------------------------------------------------------------------+
                                    |
                                    | REST API (JSON / Multipart HTTPS)
                                    v
+-------------------------------------------------------------------------+
|                           FastAPI Gateway                               |
|          Auth & RBAC Middleware | Request Telemetry | CORS              |
+-------------------------------------------------------------------------+
      |                           |                           |
      v                           v                           v
+---------------+       +-------------------+       +-------------------+
|  Auth Service |       |   Report Service  |       | Analytics Service |
| (JWT / Argon2)|       |   & Orchestrator  |       | (Timescale Aggs)  |
+---------------+       +-------------------+       +-------------------+
                                  |
            +---------------------+---------------------+
            v                                           v
+-----------------------+                   +-----------------------+
|  OCR & Text Extractor |                   |  Biomarker Normalizer |
| (PDFPlumber/Pypdf/    |                   | (LOINC Mappings, Age/ |
|  Tesseract Engine)    |                   |  Sex Reference Bands) |
+-----------------------+                   +-----------------------+
            |                                           |
            v                                           v
+-------------------------------------------------------------------------+
|                  PostgreSQL 16 Relational Persistence                   |
|       Users | Reports | Extracted Biomarkers | Clinical Notes           |
+-------------------------------------------------------------------------+
```

## 2. Multi-Stage Hybrid Extraction Pipeline

1. **Format Detection & Validation**: Validates MIME types, verifies SHA-256 hash to prevent duplicate processing, enforces file size ceilings (25MB).
2. **Text & Table OCR Layer**: Employs `pdfplumber` for digital PDFs and `Tesseract OCR` for scanned photos.
3. **Structured Parser Layer**:
   - `LLM Instructor Parser`: Validates structured extraction schemas using Pydantic.
   - `Deterministic Fallback Regex Parser`: Executes specialized regex and tabular heuristic matching across 25+ target lab tests.
4. **Biomarker Standardization & Normalizer**: Matches extracted test names against standardized LOINC aliases (e.g. `FASTING_BLOOD_SUGAR`, `HBA1C`, `CHOLESTEROL_TOTAL`).
5. **Reference Range Evaluator**: Compares observed values with biological sex and age boundaries, assigning flags: `NORMAL`, `LOW`, `HIGH`, `CRITICAL_LOW`, `CRITICAL_HIGH`.
6. **Non-Diagnostic Structured Summary**: Compiles high/low findings, parameter counts, and mandatory medical disclaimers.

## 3. Regulatory Safety & Disclaimers

The platform implements mandatory non-diagnostic banners across all user interfaces, API response headers (`X-Non-Diagnostic-Notice`), and exported PDF documents. All data presented in demonstration mode consists of synthetically generated patient records.
