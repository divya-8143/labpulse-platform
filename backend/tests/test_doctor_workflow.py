import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_doctor_assigned_patients(client: AsyncClient, doctor_token: str):
    res = await client.get("/api/v1/doctor/patients", headers={"Authorization": f"Bearer {doctor_token}"})
    assert res.status_code == 200
    patients = res.json()
    assert len(patients) >= 1
    assert patients[0]["full_name"] == "John Alex Doe"
