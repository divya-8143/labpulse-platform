import pytest
from httpx import AsyncClient
import io

@pytest.mark.asyncio
async def test_seed_and_list_reports(client: AsyncClient, patient_token: str):
    # 1. Seed synthetic reports
    seed_res = await client.post("/api/v1/synthetic/seed-patient-history", headers={"Authorization": f"Bearer {patient_token}"})
    assert seed_res.status_code == 200

    # 2. List reports
    list_res = await client.get("/api/v1/reports", headers={"Authorization": f"Bearer {patient_token}"})
    assert list_res.status_code == 200
    reports = list_res.json()
    assert len(reports) >= 3

    # 3. View detail of first report
    report_id = reports[0]["id"]
    detail_res = await client.get(f"/api/v1/reports/{report_id}", headers={"Authorization": f"Bearer {patient_token}"})
    assert detail_res.status_code == 200
    detail = detail_res.json()
    assert "biomarkers" in detail
    assert len(detail["biomarkers"]) > 0
    assert "structured_summary" in detail
