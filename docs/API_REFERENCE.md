# LabPulse Platform — REST API Reference Guide

All API endpoints are versioned under `/api/v1`.

## Authentication & Access
- `POST /api/v1/auth/login` — Authenticate with email and password. Returns JWT access and refresh tokens.
- `POST /api/v1/auth/register/patient` — Create new patient account.
- `POST /api/v1/auth/register/doctor` — Create new doctor account with medical license.
- `POST /api/v1/auth/refresh` — Renew expired access token.

## Users & Profiles
- `GET /api/v1/users/me` — Retrieve current authenticated user profile and permissions.
- `PUT /api/v1/users/profile/patient` — Update demographic and baseline medical profile.
- `PUT /api/v1/users/profile/doctor` — Update physician profile and hospital credentials.

## Medical Reports
- `POST /api/v1/reports/upload` — Upload PDF/image report, extract biomarkers, and evaluate reference ranges.
- `GET /api/v1/reports` — List patient's digitized medical reports.
- `GET /api/v1/reports/{id}` — Retrieve full report details with extracted biomarkers and doctor notes.
- `PATCH /api/v1/reports/biomarkers/{id}` — Adjust/verify extracted test value.

## Longitudinal Analytics
- `GET /api/v1/analytics/overview` — Get high-level metrics, abnormal alerts, and telemetry score.
- `GET /api/v1/analytics/trends` — Retrieve time-series data for multi-parameter interactive charts.

## Doctor Workspace
- `GET /api/v1/doctor/patients` — List authorized patients for review.
- `POST /api/v1/doctor/notes` — Attach clinical notes and verification stamp to report.

## Export & Synthetic
- `GET /api/v1/export/reports/{id}/pdf` — Download standardized clinical summary PDF.
- `POST /api/v1/synthetic/seed-patient-history` — Generate multi-year longitudinal sample reports.
