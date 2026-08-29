import asyncio
import json
import os
import datetime
from sqlalchemy import select
from app.core.database import AsyncSessionLocal, engine, Base
from app.models import (
    User, PatientProfile, DoctorProfile, DoctorPatientAccess, 
    UserRole, BiologicalSex, BiomarkerDictionary, BiomarkerCategory
)
from app.core.security import get_password_hash

async def seed_biomarker_dictionary():
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(BiomarkerDictionary))
        existing = result.scalars().all()
        if existing:
            return

        json_path = os.path.join(os.path.dirname(__file__), "..", "data", "biomarker_dictionary.json")
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        for item in data:
            bio = BiomarkerDictionary(
                standard_code=item["standard_code"],
                display_name=item["display_name"],
                aliases=item.get("aliases", []),
                category=BiomarkerCategory(item["category"]),
                standard_unit=item["standard_unit"],
                default_male_low=item.get("default_male_low"),
                default_male_high=item.get("default_male_high"),
                default_female_low=item.get("default_female_low"),
                default_female_high=item.get("default_female_high"),
                critical_low=item.get("critical_low"),
                critical_high=item.get("critical_high"),
                description=item.get("description"),
                dietary_lifestyle_context=item.get("dietary_lifestyle_context")
            )
            session.add(bio)

        await session.commit()
        print(f"Successfully seeded {len(data)} biomarker dictionary definitions!")

async def seed_demo_users():
    async with AsyncSessionLocal() as session:
        res = await session.execute(select(User).where(User.email == "patient@labpulse.demo"))
        if res.scalar_one_or_none():
            return

        # 1. Demo Patient: John Doe
        patient_user = User(
            email="patient@labpulse.demo",
            hashed_password=get_password_hash("PatientDemo123!"),
            role=UserRole.PATIENT,
            is_active=True,
            is_verified=True
        )
        session.add(patient_user)
        await session.flush()

        patient_profile = PatientProfile(
            user_id=patient_user.id,
            full_name="John Alex Doe",
            date_of_birth=datetime.date(1988, 6, 15),
            biological_sex=BiologicalSex.MALE,
            blood_group="O+",
            phone_number="+1-555-019-2834",
            address="742 Evergreen Terrace, Springfield",
            medical_history_summary="History of mild hypertension, seasonal allergies. Non-smoker.",
            emergency_contact={"name": "Sarah Doe", "relation": "Spouse", "phone": "+1-555-019-2835"}
        )
        session.add(patient_profile)

        # 2. Demo Doctor: Dr. Evelyn Reed
        doctor_user = User(
            email="doctor@labpulse.demo",
            hashed_password=get_password_hash("DoctorDemo123!"),
            role=UserRole.DOCTOR,
            is_active=True,
            is_verified=True
        )
        session.add(doctor_user)
        await session.flush()

        doctor_profile = DoctorProfile(
            user_id=doctor_user.id,
            full_name="Dr. Evelyn Reed, MD",
            license_number="MED-NY-849201",
            specialization="Internal Medicine & Metabolic Health",
            hospital_affiliation="Metropolitan Health System",
            phone_number="+1-555-014-9988",
            bio="Board-certified internist with 14 years clinical experience specializing in preventive health and metabolic wellness.",
            is_verified_practitioner=True
        )
        session.add(doctor_profile)
        await session.flush()

        # Link Patient to Doctor access
        access = DoctorPatientAccess(
            doctor_id=doctor_profile.id,
            patient_id=patient_profile.id,
            is_active=True,
            permission_level="FULL_VIEW_AND_COMMENT"
        )
        session.add(access)

        await session.commit()
        print("Demo Patient and Doctor seeded successfully!")

async def main():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    await seed_biomarker_dictionary()
    await seed_demo_users()

if __name__ == "__main__":
    asyncio.run(main())
