from fastapi import APIRouter, Depends, Response
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.services.report_service import ReportService
from app.services.pdf_export_service import PDFExportService
from app.core.exceptions import NotFoundException

router = APIRouter(prefix="/export", tags=["PDF Export & Disclaimers"])

@router.get("/reports/{report_id}/pdf")
async def export_report_summary_pdf(
    report_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Export structured clinical lab summary as a standardized, disclaimer-compliant PDF document."""
    report = await ReportService.get_report_by_id(db, report_id)
    if not report:
        raise NotFoundException("Report", report_id)

    patient_name = report.patient.full_name if report.patient else "Patient Record"
    pdf_bytes = PDFExportService.generate_clinical_summary_pdf(
        report=report,
        patient_name=patient_name,
        doctor_notes=report.clinical_notes
    )

    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename=LabPulse_Summary_{report.id[:8]}.pdf"
        }
    )
