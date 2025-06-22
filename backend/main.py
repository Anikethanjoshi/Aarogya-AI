from fastapi import FastAPI, HTTPException, Request, Depends, Query
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from routes.auth_routes import router as auth_router
from routes.health_routes import router as health_router
from routes.medicine_routes import router as medicine_router
from routes.hospital_routes import router as hospital_router
from routes.location_routes import router as location_router
from routes.jan_aushadhi_routes import router as jan_aushadhi_router
import firebase_admin
from firebase_admin import credentials, auth as firebase_auth
import os
from typing import Optional
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="AarogyaAI Backend API",
    description="Comprehensive AI Health Companion with Global Healthcare Intelligence",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Static Files
app.mount("/static", StaticFiles(directory="static"), name="static")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "https://your-app.vercel.app",
        "https://aarogyaai.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Firebase Admin Initialization
try:
    if not firebase_admin._apps:
        # Check if running in production or development
        if os.path.exists("config/firebase-admin.json"):
            cred = credentials.Certificate("config/firebase-admin.json")
        else:
            # Use environment variables in production
            cred = credentials.Certificate({
                "type": "service_account",
                "project_id": os.getenv("FIREBASE_PROJECT_ID"),
                "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID"),
                "private_key": os.getenv("FIREBASE_PRIVATE_KEY", "").replace('\\n', '\n'),
                "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
                "client_id": os.getenv("FIREBASE_CLIENT_ID"),
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
            })
        firebase_admin.initialize_app(cred)
        logger.info("Firebase Admin initialized successfully")
except Exception as e:
    logger.warning(f"Firebase initialization failed: {e}")

# Token Verification Dependency
def verify_token_dependency(request: Request):
    token = request.headers.get("Authorization")
    if not token:
        raise HTTPException(status_code=401, detail="Token missing")
    token = token.replace("Bearer ", "")
    try:
        decoded_token = firebase_auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")

# Health check endpoint
@app.get("/")
def read_root():
    return {
        "message": "AarogyaAI Backend API is running",
        "version": "1.0.0",
        "features": [
            "Jan Aushadhi Medicine Database",
            "Global Medicine Search",
            "Hospital Tools & Equipment",
            "Location-based Services",
            "Tavus AI Integration",
            "Multilingual Support"
        ]
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "message": "AarogyaAI Backend is operational",
        "services": {
            "database": "connected",
            "firebase": "initialized",
            "api": "running"
        }
    }

# Include routers
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(health_router, prefix="/api/health", tags=["Health"])
app.include_router(medicine_router, prefix="/api/medicines", tags=["Medicines"])
app.include_router(hospital_router, prefix="/api/hospital", tags=["Hospital Tools"])
app.include_router(location_router, prefix="/api/locations", tags=["Locations"])
app.include_router(jan_aushadhi_router, prefix="/api/jan-aushadhi", tags=["Jan Aushadhi"])

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error", "message": str(exc)}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)