import os
import httpx
import jwt
from fastapi import APIRouter, Request, HTTPException, Depends
from fastapi.responses import RedirectResponse
from starlette.config import Config
from starlette.requests import Request
from datetime import datetime, timedelta
from typing import Optional
from . import crud
from .database import users_collection

router = APIRouter()

config = Config("backend/.env")

DISCORD_CLIENT_ID = config("DISCORD_CLIENT_ID", cast=str)
DISCORD_CLIENT_SECRET = config("DISCORD_CLIENT_SECRET", cast=str)
DISCORD_REDIRECT_URI = config("DISCORD_REDIRECT_URI", cast=str)
SECRET_KEY = config("JWT_SECRET", cast=str, default="mind-sink-secret")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 1 day

DISCORD_TOKEN_URL = "https://discord.com/api/oauth2/token"
DISCORD_USER_API = "https://discord.com/api/users/@me"


async def get_or_create_user(user_id: str, username: str) -> dict:
    user = await users_collection.find_one({"user_id": user_id})
    if user:
        return user

    new_user = {"user_id": user_id, "username": username, "created_at": datetime.now()}
    result = await users_collection.insert_one(new_user)
    new_user["_id"] = result.inserted_id
    return new_user


@router.get("/auth/login")
async def login():
    url = (
        f"https://discord.com/oauth2/authorize"
        f"?client_id={DISCORD_CLIENT_ID}"
        f"&redirect_uri={DISCORD_REDIRECT_URI}"
        f"&response_type=code"
        f"&scope=identify"
    )
    return RedirectResponse(url)


@router.get("/auth/callback")
async def auth_callback(request: Request):
    code = request.query_params.get("code")
    if not code:
        raise HTTPException(status_code=400, detail="Missing code")

    print(f"Received code: {code}")  # Debugging

    async with httpx.AsyncClient() as client:
        headers = {"Content-Type": "application/x-www-form-urlencoded"}
        data = {
            "client_id": DISCORD_CLIENT_ID,
            "client_secret": DISCORD_CLIENT_SECRET,
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": DISCORD_REDIRECT_URI,
        }

        token_resp = await client.post(DISCORD_TOKEN_URL, data=data, headers=headers)

        if token_resp.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to fetch access token")

        access_token = token_resp.json()["access_token"]

        user_resp = await client.get(
            DISCORD_USER_API, headers={"Authorization": f"Bearer {access_token}"}
        )

        if user_resp.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to fetch user data")

        user_data = user_resp.json()

        user_id = user_data["id"]
        username = user_data["username"]

        user = await get_or_create_user(user_id, username)
        print(f"User record: {user}")  # Debugging

        jwt_payload = {
            "sub": user_id,
            "exp": datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
        }
        token = jwt.encode(jwt_payload, SECRET_KEY, algorithm=ALGORITHM)

        return {"access_token": token, "token_type": "bearer"}


def verify_jwt(token: str) -> Optional[str]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload.get("sub")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
