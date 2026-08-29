from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional, Dict, Any, List
from app.models.biomarker import BiomarkerDictionary, BiomarkerStatus, BiomarkerCategory
from app.models.user import BiologicalSex

class BiomarkerNormalizer:
    """
    Normalizes extracted raw lab test names against standard biomarker dictionary,
    harmonizes units, and computes clinical reference interval status (NORMAL, LOW, HIGH, CRITICAL).
    """

    @staticmethod
    async def match_dictionary_entry(db: AsyncSession, raw_name: str) -> Optional[BiomarkerDictionary]:
        raw_clean = raw_name.strip().lower()
        
        # 1. Exact match on standard_code or display_name
        stmt = select(BiomarkerDictionary)
        result = await db.execute(stmt)
        entries = result.scalars().all()

        for entry in entries:
            if entry.standard_code.lower() == raw_clean or entry.display_name.lower() == raw_clean:
                return entry
            
            # Check aliases
            if entry.aliases:
                for alias in entry.aliases:
                    if alias.lower() in raw_clean or raw_clean in alias.lower():
                        return entry

        # Partial token match
        for entry in entries:
            tokens = [t.lower() for t in entry.display_name.split() if len(t) > 3]
            for token in tokens:
                if token in raw_clean:
                    return entry

        return None

    @staticmethod
    def evaluate_status(
        value: Optional[float],
        ref_low: Optional[float],
        ref_high: Optional[float],
        critical_low: Optional[float] = None,
        critical_high: Optional[float] = None
    ) -> tuple[BiomarkerStatus, bool]:
        """
        Returns (status: BiomarkerStatus, is_abnormal: bool)
        """
        if value is None or (ref_low is None and ref_high is None):
            return BiomarkerStatus.NORMAL, False

        # Critical thresholds
        if critical_low is not None and value <= critical_low:
            return BiomarkerStatus.CRITICAL_LOW, True
        if critical_high is not None and value >= critical_high:
            return BiomarkerStatus.CRITICAL_HIGH, True

        # Standard boundaries
        if ref_low is not None and value < ref_low:
            return BiomarkerStatus.LOW, True
        if ref_high is not None and value > ref_high:
            return BiomarkerStatus.HIGH, True

        return BiomarkerStatus.NORMAL, False

    @staticmethod
    def get_reference_range(
        dictionary_entry: Optional[BiomarkerDictionary],
        extracted_low: Optional[float],
        extracted_high: Optional[float],
        sex: BiologicalSex = BiologicalSex.OTHER
    ) -> tuple[Optional[float], Optional[float], Optional[float], Optional[float]]:
        """
        Returns (ref_low, ref_high, critical_low, critical_high) prioritizing extracted report ranges,
        falling back to age/sex standard reference intervals.
        """
        if extracted_low is not None or extracted_high is not None:
            crit_low = dictionary_entry.critical_low if dictionary_entry else None
            crit_high = dictionary_entry.critical_high if dictionary_entry else None
            return extracted_low, extracted_high, crit_low, crit_high

        if not dictionary_entry:
            return None, None, None, None

        if sex == BiologicalSex.FEMALE:
            ref_low = dictionary_entry.default_female_low or dictionary_entry.default_male_low
            ref_high = dictionary_entry.default_female_high or dictionary_entry.default_male_high
        else:
            ref_low = dictionary_entry.default_male_low
            ref_high = dictionary_entry.default_male_high

        return ref_low, ref_high, dictionary_entry.critical_low, dictionary_entry.critical_high
