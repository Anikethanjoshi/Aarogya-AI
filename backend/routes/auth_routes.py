from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.post("/login")
async def login(username: str, password: str):
    if username == "admin" and password == "123456":
        return {"message": "Login successful", "token": "fake-jwt-token"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@router.post("/register")
async def register(username: str, password: str):
    # In real app, you'd save to a database
    return {"message": f"User {username} registered successfully"}

