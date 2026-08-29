import pytest
from app.services.fallback_parser import FallbackParser

def test_fallback_parser_tabular_text():
    sample_text = """
    DIAGNOSTIC LAB RESULTS
    Fasting Blood Glucose : 108.5 mg/dL (70.0 - 99.0)
    HbA1c : 6.2 % (4.0 - 5.6)
    Total Cholesterol : 215.0 mg/dL (125.0 - 200.0)
    Serum Creatinine : 0.95 mg/dL (0.7 - 1.3)
    """
    results = FallbackParser.parse_text(sample_text)
    assert len(results) >= 4

    names = [r["raw_test_name"] for r in results]
    assert any("Glucose" in n for n in names)
    assert any("HbA1c" in n or "Glycated" in n for n in names)
    assert any("Cholesterol" in n for n in names)
