from pydantic import BaseModel

class User(BaseModel):
    uid: str
    name: str
    email: str
    role: str  # doctor, pharmacist, medicist, general
