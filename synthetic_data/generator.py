import os
import io
import datetime
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

SAMPLE_DIR = os.path.join(os.path.dirname(__file__), "samples")
os.makedirs(SAMPLE_DIR, exist_ok=True)

REPORTS_DATA = [
    {
        "filename": "sample_complete_blood_count.pdf",
        "title": "Complete Blood Count (CBC) with Differential",
        "lab": "Metro Diagnostics & Pathology",
        "date": "2025-06-12",
        "patient": "John Alex Doe (Age 37, Male)",
        "tests": [
            ("Hemoglobin (Hb)", "14.2", "g/dL", "13.5 - 17.5", "Normal"),
            ("RBC Count", "4.8", "million/mcL", "4.5 - 5.9", "Normal"),
            ("WBC Count", "6800", "cells/mcL", "4500 - 11000", "Normal"),
            ("Platelet Count", "240", "10^3/mcL", "150 - 450", "Normal"),
            ("Hematocrit (Hct)", "42.5", "%", "41.0 - 50.0", "Normal")
        ]
    },
    {
        "filename": "sample_comprehensive_metabolic_panel.pdf",
        "title": "Comprehensive Metabolic & Glycemic Panel",
        "lab": "Apex Health Diagnostics",
        "date": "2025-09-18",
        "patient": "John Alex Doe (Age 37, Male)",
        "tests": [
            ("Fasting Blood Glucose", "112.0", "mg/dL", "70.0 - 99.0", "Elevated"),
            ("Glycated Hemoglobin (HbA1c)", "6.1", "%", "4.0 - 5.6", "Elevated"),
            ("Serum Creatinine", "1.05", "mg/dL", "0.7 - 1.3", "Normal"),
            ("Blood Urea Nitrogen (BUN)", "16.0", "mg/dL", "7.0 - 20.0", "Normal"),
            ("Estimated GFR (eGFR)", "88.0", "mL/min/1.73m2", "60.0 - 120.0", "Normal")
        ]
    },
    {
        "filename": "sample_lipid_panel.pdf",
        "title": "Standard Fasting Lipid Profile",
        "lab": "Central Clinical Laboratories",
        "date": "2025-11-20",
        "patient": "John Alex Doe (Age 37, Male)",
        "tests": [
            ("Total Cholesterol", "218.0", "mg/dL", "125.0 - 200.0", "Elevated"),
            ("HDL Cholesterol", "42.0", "mg/dL", "40.0 - 80.0", "Normal"),
            ("LDL Cholesterol", "138.0", "mg/dL", "0.0 - 100.0", "Elevated"),
            ("Triglycerides", "190.0", "mg/dL", "0.0 - 150.0", "Elevated")
        ]
    },
    {
        "filename": "sample_liver_and_thyroid_panel.pdf",
        "title": "Hepatic Function & Thyroid Screening",
        "lab": "Metro Diagnostics & Pathology",
        "date": "2026-01-15",
        "patient": "John Alex Doe (Age 37, Male)",
        "tests": [
            ("ALT (SGPT)", "48.0", "U/L", "7.0 - 56.0", "Normal"),
            ("AST (SGOT)", "34.0", "U/L", "10.0 - 40.0", "Normal"),
            ("Total Bilirubin", "0.9", "mg/dL", "0.2 - 1.2", "Normal"),
            ("Thyroid Stimulating Hormone (TSH)", "2.4", "mIU/L", "0.4 - 4.0", "Normal"),
            ("Vitamin D (25-OH)", "24.0", "ng/mL", "30.0 - 100.0", "Low"),
            ("hs-CRP", "2.1", "mg/L", "0.0 - 3.0", "Normal")
        ]
    }
]

def generate_sample_pdf(item: dict) -> str:
    file_path = os.path.join(SAMPLE_DIR, item["filename"])
    doc = SimpleDocTemplate(file_path, pagesize=letter, rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36)
    styles = getSampleStyleSheet()

    title_style = ParagraphStyle('RepTitle', parent=styles['Heading1'], fontSize=16, textColor=colors.HexColor("#0F172A"), spaceAfter=2)
    meta_style = ParagraphStyle('RepMeta', parent=styles['Normal'], fontSize=9, textColor=colors.HexColor("#64748B"), spaceAfter=8)
    disclaimer_style = ParagraphStyle('Disclaimer', parent=styles['Normal'], fontSize=8, textColor=colors.HexColor("#475569"))

    elements = []
    elements.append(Paragraph(f"<b>{item['lab']}</b>", title_style))
    elements.append(Paragraph(f"Official Diagnostic Laboratory Report — {item['title']}", styles['Heading3']))
    elements.append(Paragraph(f"Patient: {item['patient']} | Collection Date: {item['date']} | Status: Verified Final", meta_style))
    elements.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#0D9488"), spaceBefore=2, spaceAfter=8))

    # Test Results Table
    rows = [["Test Parameter / Investigation", "Observed Value", "Unit", "Reference Interval", "Flag"]]
    for name, val, unit, ref, flag in item["tests"]:
        is_abnormal = flag != "Normal"
        val_display = f"<b>{val}</b>" if is_abnormal else val
        flag_display = f"<font color='red'><b>{flag}</b></font>" if is_abnormal else f"<font color='green'>{flag}</font>"
        rows.append([
            Paragraph(name, styles['Normal']),
            Paragraph(val_display, styles['Normal']),
            Paragraph(unit, styles['Normal']),
            Paragraph(ref, styles['Normal']),
            Paragraph(flag_display, styles['Normal'])
        ])

    table = Table(rows, colWidths=[200, 80, 80, 110, 70])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#0F172A")),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    elements.append(table)
    elements.append(Spacer(1, 16))

    # Doctor Verification signature line
    elements.append(Paragraph("<b>Pathologist Sign-off:</b> Dr. Robert H. Vance, MD (Chief of Clinical Pathology)", styles['Normal']))
    elements.append(Spacer(1, 12))

    # Disclaimer
    elements.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#94A3B8"), spaceBefore=4, spaceAfter=4))
    elements.append(Paragraph("<i>SYNTHETIC DEMO RECORD — For test digitization and data analytics demonstration only.</i>", disclaimer_style))

    doc.build(elements)
    print(f"Generated: {file_path}")
    return file_path

if __name__ == "__main__":
    for rep in REPORTS_DATA:
        generate_sample_pdf(rep)
