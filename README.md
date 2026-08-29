# LabPulse Platform 🏥 🔬

An enterprise-grade, AI-powered Medical Lab Report Digitization, Biomarker Trend Analysis, and Clinical Review Platform built for patients and healthcare practitioners.

> **LEGAL & CLINICAL DISCLAIMER**:  
> This application is strictly an **informational record-keeping and data visualization platform**. It **does NOT diagnose medical conditions, provide clinical advice, or prescribe treatments**. All health decisions must be made in consultation with licensed healthcare professionals. All patient records in this platform utilize **synthetic demo data**.

---

## 📋 Table of Contents
- [Architecture & Overview](#architecture--overview)
- [Key Features](#key-features)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Build](#build)
- [Run](#run)
- [Usage](#usage)
- [Automated Testing](#automated-testing)
- [Docker Deployment](#docker-deployment)

---

## 🏗️ Architecture & Overview
LabPulse Platform is designed with a decoupled clean architecture:
- **Backend**: FastAPI (Python 3.11+), SQLAlchemy 2.0 Async ORM, Pydantic v2, SQLite/PostgreSQL, Argon2 Hashing, JWT RBAC Auth, and multi-tier OCR / LOINC ontology matching.
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Recharts interactive time-series corridors, and Lucide icons.
- **Clinical Intelligence**: Parameter normalizer, risk score calculators (Framingham, FIB-4, CKD-EPI, HOMA-IR), drug-biomarker interaction matrices, and non-diagnostic summary engines.

---

## ✨ Key Features
1. **Multi-Format Report Ingestion**: PDF & image lab reports digitized via heuristic and structured OCR pipelines.
2. **Standard Reference Corridors**: Shaded target reference intervals with percentage trajectory deviations.
3. **Clinical Risk Studios**: Evidence-based risk score calculations (Cardiovascular, Liver Fibrosis, Renal GFR, Insulin Resistance).
4. **Physician Verification Workspace**: Authorized doctor roster, clinical impression attachment, and digital verification stamps.
5. **Standardized PDF Summaries**: High-resolution branded clinical export summaries generated with ReportLab.

---

## 📦 Dependencies

### Backend Dependencies
- `fastapi` >= 0.110.0
- `uvicorn` >= 0.28.0
- `pydantic` >= 2.6.0
- `sqlalchemy` >= 2.0.28
- `aiosqlite` >= 0.20.0
- `python-jose` >= 3.3.0
- `passlib` & `argon2-cffi`
- `reportlab` >= 4.1.0
- `pdfplumber` & `pypdf`

### Frontend Dependencies
- `react` & `react-dom` >= 18.2.0
- `typescript` >= 5.2.0
- `vite` >= 5.1.0
- `tailwindcss` >= 3.4.0
- `recharts` >= 2.12.0
- `lucide-react` >= 0.350.0
- `axios` >= 1.6.0
- `react-router-dom` >= 6.22.0

---

## 💻 Installation

### 1. Clone & Setup Workspace
```bash
git clone https://github.com/divya-8143/labpulse-platform.git
cd labpulse-platform
```

### 2. Backend Environment Setup
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
cp ../example.env .env
```

### 3. Frontend Environment Setup
```bash
cd ../frontend
npm install
```

---

## 🔨 Build

### Building Frontend Assets for Production
```bash
cd frontend
npm run build
```
The compiled static assets will be output to `frontend/dist/`.

### Building Docker Containers
```bash
docker-compose build
```

---

## 🚀 Run

### 1. Start the Backend API Server
```bash
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
- Interactive Swagger UI: `http://localhost:8000/docs`
- ReDoc API Reference: `http://localhost:8000/redoc`

### 2. Start the Frontend Development Server
```bash
cd frontend
npm run dev -- --host 0.0.0.0 --port 3000
```
- Access Web Application: `http://localhost:3000`

### 3. Running with Docker Compose
```bash
docker-compose up -d
```

---

## 📖 Usage

1. **Sign In**:
   - Navigate to `http://localhost:3000/login`.
   - Use the **1-Click Demo Buttons** or enter:
     - **Patient**: `patient@labpulse.demo` / `PatientDemo123!`
     - **Doctor**: `doctor@labpulse.demo` / `DoctorDemo123!`
2. **Upload Reports**:
   - Drag and drop lab report PDFs from `synthetic_data/samples/`.
   - The platform extracts biomarkers and plots them against standard biological ranges.
3. **Biomarker Trends**:
   - Explore longitudinal trajectories, green target reference corridors, and category breakdowns.
4. **Clinical Notes & Export**:
   - Physicians can verify results and attach signed clinical notes.
   - Download the official PDF summary with a single click.

---

## 🧪 Automated Testing

Execute the automated test suite covering authentication, parsing, normalization, risk engines, and clinical workflows:
```bash
cd backend
pytest tests/ -v
```

---

## 📄 License
Proprietary & Confidential. All Rights Reserved.
