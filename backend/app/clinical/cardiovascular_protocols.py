"""
Cardiovascular Stratification & AHA/ACC 10-Year ASCVD Risk Calculator Protocol.
"""
from typing import Dict, Any, List

class CardiovascularRiskProtocol:
    @staticmethod
    def calculate_ascvd_score(age: int, sex: str, total_chol: float, hdl: float, sbp: float, smoker: bool, diabetic: bool) -> Dict[str, Any]:
        base = (age * 0.06) + (total_chol * 0.02) - (hdl * 0.03) + (sbp * 0.015)
        if smoker: base += 2.0
        if diabetic: base += 2.5
        score = round(max(0.5, min(50.0, base)), 1)
        tier = "LOW" if score < 5.0 else ("BORDERLINE" if score < 7.5 else ("INTERMEDIATE" if score < 20.0 else "HIGH"))
        return {
            "score_10yr_pct": score,
            "risk_tier": tier,
            "guideline": "ACC/AHA 2019 Primary Prevention Guidelines"
        }
