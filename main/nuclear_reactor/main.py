from fastapi import FastAPI
from pydantic import BaseModel
from database import engine, SessionLocal, metadata
from models import User
from attendy_engine import generate_qr

app = FastAPI()
metadata.create_all(engine)

class Onboard(BaseModel):
    fullName: str
    username: str
    role: str

@app.post("/onboarding")
def save_onboarding(data: Onboard):
    db = SessionLocal()
    db.execute(
        User.insert().values(
            full_name=data.fullName,
            username=data.username,
            role=data.role
        )
    )
    db.commit()
    return {"status": "saved"}

@app.get("/qr")
def get_qr(text: str):
    return {"qr": generate_qr(text)}
