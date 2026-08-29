"""
KDIGO 2023 Chronic Kidney Disease Staging Matrix & Albuminuria Progression Protocol.
"""
from typing import Dict, Any

class RenalKdigoProtocol:
    @staticmethod
    def stage_ckd(egfr: float, uacr: float) -> Dict[str, Any]:
        g_stage = "G1" if egfr >= 90 else ("G2" if egfr >= 60 else ("G3a" if egfr >= 45 else ("G3b" if egfr >= 30 else ("G4" if egfr >= 15 else "G5"))))
        a_stage = "A1" if uacr < 30 else ("A2" if uacr <= 300 else "A3")
        return {
            "g_stage": g_stage,
            "a_stage": a_stage,
            "composite_stage": f"{g_stage}{a_stage}",
            "surveillance_frequency": "Annually" if g_stage in ["G1", "G2"] and a_stage == "A1" else "Every 3-6 Months"
        }
