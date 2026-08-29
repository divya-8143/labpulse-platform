import pytest
import asyncio
from httpx import AsyncClient, ASGITransport
import os
import sys

backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from app.main import app
from app.core.database import Base, engine, AsyncSessionLocal, get_db
from app.services.seed_service import seed_biomarker_dictionary, seed_demo_users

@pytest.fixture(scope="session", autouse=True)
def setup_database():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    
    async def init_db():
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.drop_all)
            await conn.run_sync(Base.metadata.create_all)
        await seed_biomarker_dictionary()
        await seed_demo_users()
        
    loop.run_until_complete(init_db())
    yield
    loop.close()

@pytest.fixture
async def client():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        yield ac

@pytest.fixture
async def patient_token(client: AsyncClient):
    res = await client.post("/api/v1/auth/login", json={
        "email": "patient@labpulse.demo",
        "password": "PatientDemo123!"
    })
    assert res.status_code == 200
    return res.json()["access_token"]

@pytest.fixture
async def doctor_token(client: AsyncClient):
    res = await client.post("/api/v1/auth/login", json={
        "email": "doctor@labpulse.demo",
        "password": "DoctorDemo123!"
    })
    assert res.status_code == 200
    return res.json()["access_token"]
