import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_analytics_overview_and_trends(client: AsyncClient, patient_token: str):
    # Ensure reports seeded
    await client.post("/api/v1/synthetic/seed-patient-history", headers={"Authorization": f"Bearer {patient_token}"})

    # Overview endpoint
    ov_res = await client.get("/api/v1/analytics/overview", headers={"Authorization": f"Bearer {patient_token}"})
    assert ov_res.status_code == 200
    ov = ov_res.json()
    assert ov["total_reports_count"] >= 3
    assert ov["total_biomarkers_tracked"] > 0
    assert "disclaimer" in ov

    # Trends endpoint
    tr_res = await client.get("/api/v1/analytics/trends", headers={"Authorization": f"Bearer {patient_token}"})
    assert tr_res.status_code == 200
    trends = tr_res.json()
    assert len(trends) > 0
    assert len(trends[0]["data_points"]) >= 1
