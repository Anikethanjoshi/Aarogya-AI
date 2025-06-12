import firebase_admin
from firebase_admin import credentials, auth as firebase_auth
from fastapi import HTTPException, Request

cred = credentials.Certificate("firebase-admin.json")
firebase_admin.initialize_app(cred)

def verify_token(request: Request):
    token = request.headers.get("Authorization")
    if not token:
        raise HTTPException(status_code=401, detail="Token missing")
    token = token.replace("Bearer ", "")
    try:
        decoded_token = firebase_auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))
