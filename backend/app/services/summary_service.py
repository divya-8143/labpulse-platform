from typing import List, Dict, Any
from app.models.biomarker import BiomarkerStatus

class SummaryService:
    """
    Generates structured, non-diagnostic health parameter summaries with clear wellness context.
    """

    @staticmethod
    def generate_report_summary(biomarkers: List[Dict[str, Any]]) -> Dict[str, Any]:
        total = len(biomarkers)
        abnormal = [b for b in biomarkers if b.get("is_abnormal")]
        normal = [b for b in biomarkers if not b.get("is_abnormal")]

        high_items = [b for b in abnormal if b.get("status") in [BiomarkerStatus.HIGH, BiomarkerStatus.CRITICAL_HIGH, "HIGH", "CRITICAL_HIGH"]]
        low_items = [b for b in abnormal if b.get("status") in [BiomarkerStatus.LOW, BiomarkerStatus.CRITICAL_LOW, "LOW", "CRITICAL_LOW"]]

        disclaimer = (
            "NOTICE: This summary is generated for informational record-keeping and tracking purposes only. "
            "It does NOT constitute a medical diagnosis, clinical evaluation, or treatment plan. "
            "Please review all lab results with a licensed healthcare practitioner."
        )

        insights = []
        if abnormal:
            insights.append(f"Identified {len(abnormal)} parameter(s) outside standard clinical reference intervals.")
            if high_items:
                high_names = ", ".join([b.get("standard_name") or b.get("raw_test_name") for b in high_items[:3]])
                insights.append(f"Elevated parameters include: {high_names}.")
            if low_items:
                low_names = ", ".join([b.get("standard_name") or b.get("raw_test_name") for b in low_items[:3]])
                insights.append(f"Low parameters include: {low_names}.")
        else:
            insights.append("All extracted biomarker values fall within standard healthy reference intervals.")

        return {
            "total_parameters": total,
            "normal_count": len(normal),
            "abnormal_count": len(abnormal),
            "high_count": len(high_items),
            "low_count": len(low_items),
            "insights": insights,
            "disclaimer": disclaimer,
            "status_breakdown": {
                "normal": len(normal),
                "elevated": len(high_items),
                "low": len(low_items)
            }
        }
