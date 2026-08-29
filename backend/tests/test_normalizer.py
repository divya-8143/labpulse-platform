import pytest
from app.services.normalizer_service import BiomarkerNormalizer
from app.models.biomarker import BiomarkerStatus
from app.models.user import BiologicalSex

def test_evaluate_status_normal():
    status, is_abnormal = BiomarkerNormalizer.evaluate_status(
        value=85.0,
        ref_low=70.0,
        ref_high=99.0,
        critical_low=50.0,
        critical_high=400.0
    )
    assert status == BiomarkerStatus.NORMAL
    assert is_abnormal is False

def test_evaluate_status_elevated():
    status, is_abnormal = BiomarkerNormalizer.evaluate_status(
        value=115.0,
        ref_low=70.0,
        ref_high=99.0,
        critical_low=50.0,
        critical_high=400.0
    )
    assert status == BiomarkerStatus.HIGH
    assert is_abnormal is True

def test_evaluate_status_critical():
    status, is_abnormal = BiomarkerNormalizer.evaluate_status(
        value=450.0,
        ref_low=70.0,
        ref_high=99.0,
        critical_low=50.0,
        critical_high=400.0
    )
    assert status == BiomarkerStatus.CRITICAL_HIGH
    assert is_abnormal is True
