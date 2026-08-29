from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
import io
import datetime
from app.models.report import MedicalReport

class PDFExportService:
    @staticmethod
    def generate_clinical_summary_pdf(report: MedicalReport, patient_name: str, doctor_notes: list) -> bytes:
        """
        Generates a clean, branded, standardized PDF medical summary document with legal disclaimers.
        """
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(
            buffer,
            pagesize=letter,
            rightMargin=36,
            leftMargin=36,
            topMargin=36,
            bottomMargin=36
        )

        styles = getSampleStyleSheet()
        primary_color = colors.HexColor("#0D9488")
        dark_navy = colors.HexColor("#0F172A")
        danger_color = colors.HexColor("#DC2626")

        title_style = ParagraphStyle(
            'DocTitle',
            parent=styles['Heading1'],
            fontName='Helvetica-Bold',
            fontSize=18,
            textColor=dark_navy,
            spaceAfter=4
        )

        subtitle_style = ParagraphStyle(
            'DocSubtitle',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=10,
            textColor=colors.HexColor("#64748B"),
            spaceAfter=12
        )

        disclaimer_style = ParagraphStyle(
            'Disclaimer',
            parent=styles['Normal'],
            fontName='Helvetica-Oblique',
            fontSize=8,
            textColor=colors.HexColor("#475569"),
            leading=10
        )

        elements = []

        # Header Title
        elements.append(Paragraph("LabPulse Health Platform — Clinical Lab Summary", title_style))
        elements.append(Paragraph(f"Digitized Record generated on {datetime.date.today().strftime('%B %d, %Y')} | Synthetic Healthcare Data", subtitle_style))
        elements.append(HRFlowable(width="100%", thickness=1.5, color=primary_color, spaceBefore=2, spaceAfter=10))

        # Patient & Report Metadata Table
        meta_data = [
            [Paragraph("<b>Patient Name:</b>", styles['Normal']), Paragraph(patient_name, styles['Normal']),
             Paragraph("<b>Report Date:</b>", styles['Normal']), Paragraph(str(report.report_date or 'N/A'), styles['Normal'])],
            [Paragraph("<b>Lab Name:</b>", styles['Normal']), Paragraph(report.lab_name or 'Clinical Laboratory', styles['Normal']),
             Paragraph("<b>Category:</b>", styles['Normal']), Paragraph(report.category.value, styles['Normal'])],
            [Paragraph("<b>Status:</b>", styles['Normal']), Paragraph(report.status.value, styles['Normal']),
             Paragraph("<b>Abnormal Count:</b>", styles['Normal']), Paragraph(str(report.abnormal_biomarkers_count), styles['Normal'])]
        ]
        meta_table = Table(meta_data, colWidths=[90, 180, 90, 180])
        meta_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F8FAFC")),
            ('PADDING', (0, 0), (-1, -1), 6),
            ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ]))
        elements.append(meta_table)
        elements.append(Spacer(1, 14))

        # Extracted Biomarkers Table
        elements.append(Paragraph("<b>Extracted Biomarkers & Reference Interval Comparison</b>", styles['Heading3']))
        elements.append(Spacer(1, 4))

        headers = ["Test Name", "Result", "Unit", "Reference Interval", "Evaluation"]
        table_rows = [headers]

        for bio in report.biomarkers:
            val_str = f"{bio.numeric_value}" if bio.numeric_value is not None else (bio.string_value or "N/A")
            ref_str = f"{bio.ref_range_low} - {bio.ref_range_high}" if (bio.ref_range_low is not None and bio.ref_range_high is not None) else "Standard"
            
            stat = bio.status.value
            table_rows.append([
                Paragraph(bio.standard_name, styles['Normal']),
                Paragraph(f"<b>{val_str}</b>" if bio.is_abnormal else val_str, styles['Normal']),
                Paragraph(bio.unit or "", styles['Normal']),
                Paragraph(ref_str, styles['Normal']),
                Paragraph(f"<font color='{danger_color.hexval()}'><b>{stat}</b></font>" if bio.is_abnormal else f"<font color='{primary_color.hexval()}'>{stat}</font>", styles['Normal'])
            ])

        bio_table = Table(table_rows, colWidths=[180, 70, 70, 120, 100])
        bio_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#0F172A")),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 6),
            ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor("#FFFFFF")),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ]))
        elements.append(bio_table)
        elements.append(Spacer(1, 14))

        # Doctor Clinical Notes Section if available
        if doctor_notes:
            elements.append(Paragraph("<b>Physician Review & Clinical Commentary</b>", styles['Heading3']))
            elements.append(Spacer(1, 4))
            for note in doctor_notes:
                note_content = [
                    [Paragraph(f"<b>Impression:</b> {note.clinical_impression}", styles['Normal'])],
                    [Paragraph(f"<b>Lifestyle/Dietary Advice:</b> {note.dietary_lifestyle_recommendations or 'None'}", styles['Normal'])],
                    [Paragraph(f"<b>Follow-up:</b> {note.follow_up_advice or 'Routine periodic checkup'}", styles['Normal'])]
                ]
                note_table = Table(note_content, colWidths=[540])
                note_table.setStyle(TableStyle([
                    ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F0FDF4")),
                    ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#86EFAC")),
                    ('PADDING', (0, 0), (-1, -1), 6),
                ]))
                elements.append(note_table)
                elements.append(Spacer(1, 10))

        # Legal Non-Diagnostic Medical Disclaimer Footer
        elements.append(Spacer(1, 10))
        elements.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#94A3B8"), spaceBefore=6, spaceAfter=6))
        disclaimer_text = (
            "<b>MANDATORY MEDICAL DISCLAIMER:</b> This summary is produced by an automated digital health platform "
            "using synthetic demo data for record-keeping and informational tracking. It does NOT constitute a diagnostic decision, "
            "prognosis, or prescription. Always consult a qualified licensed physician or healthcare provider for medical evaluations."
        )
        elements.append(Paragraph(disclaimer_text, disclaimer_style))

        doc.build(elements)
        pdf_bytes = buffer.getvalue()
        buffer.close()
        return pdf_bytes
