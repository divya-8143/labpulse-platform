import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_patient_login_success(client: AsyncClient):
    res = await client.post("/api/v1/auth/login", json={
        "email": "patient@labpulse.demo",
        "password": "PatientDemo123!"
    })
    assert res.status_code == 200
    data = res.json()
    assert "access_token" in data
    assert data["role"] == "PATIENT"
    assert data["email"] == "patient@labpulse.demo"

@pytest.mark.asyncio
async def test_doctor_login_success(client: AsyncClient):
    res = await client.post("/api/v1/auth/login", json={
        "email": "doctor@labpulse.demo",
        "password": "DoctorDemo123!"
    })
    assert res.status_code == 200
    data = res.json()
    assert "access_token" in data
    assert data["role"] == "DOCTOR"

@pytest.mark.asyncio
async def test_login_invalid_password(client: AsyncClient):
    res = await client.post("/api/v1/auth/login", json={
        "email": "patient@labpulse.demo",
        "password": "WrongPassword123!"
    })
    assert res.status_code == 401

@pytest.mark.asyncio
async def test_get_current_user_profile(client: AsyncClient, patient_token: str):
    res = await client.get("/api/v1/users/me", headers={"Authorization": f"Bearer {patient_token}"})
    assert res.status_code == 200
    data = res.json()
    assert data["email"] == "patient@labpulse.demo"
    assert data["patient_profile"]["full_name"] == "John Alex Doe"
