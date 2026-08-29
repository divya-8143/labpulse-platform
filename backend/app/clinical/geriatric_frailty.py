"""
Geriatric Multimorbidity, Frailty & Sarcopenia Laboratory Biomarker Index.
"""
from typing import Dict, Any

class GeriatricFrailtyEngine:
    @staticmethod
    def calculate_frailty_score(albumin: float, crp: float, hgb: float, egfr: float, vit_d: float) -> Dict[str, Any]:
        points = 0
        if albumin < 3.5: points += 2
        if crp > 3.0: points += 2
        if hgb < 12.0: points += 1
        if egfr < 60.0: points += 1
        if vit_d < 20.0: points += 1
        classification = "ROBUST" if points <= 1 else ("PRE_FRAIL" if points <= 3 else "FRAIL_COMPLEX")
        return {
            "frailty_points": points,
            "clinical_tier": classification,
            "nutritional_support_indicated": albumin < 3.5 or vit_d < 20.0,
            "multidisciplinary_review": points >= 3
        }
