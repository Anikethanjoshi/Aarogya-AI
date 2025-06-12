from fastapi import APIRouter

router = APIRouter()

@router.get("/ping")
async def health_check():
    return {"status": "healthy", "message": "Server is up and running"}
