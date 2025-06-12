from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from routes.auth_routes import router as auth_router
from routes.health_routes import router as health_router
import firebase_admin
from firebase_admin import credentials, auth as firebase_auth

app = FastAPI()

# Static Files
app.mount("/static", StaticFiles(directory="static"), name="static")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://your-app.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Firebase Admin Initialization
if not firebase_admin._apps:
    cred = credentials.Certificate("config/firebase-admin.json")
    firebase_admin.initialize_app(cred)

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

# Routers
app.include_router(auth_router, prefix="/auth")
app.include_router(health_router, prefix="/health")

@app.get("/")
def read_root():
    return {"message": "AarogyaAI backend is working"}
