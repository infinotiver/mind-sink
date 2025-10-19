from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv




try:
    MONGO_DETAILS = os.environ["MONGO-URI"]
except Exception:
    # optional: load .env if present (no hard requirement on the dependency)
    from dotenv import load_dotenv  # type: ignore
    load_dotenv()
    MONGO_DETAILS = os.environ.get("MONGO-URI") or os.environ.get("MONGO_URI")
    # dotenv not installed or failed to load; continue to fallback
    pass
client = AsyncIOMotorClient(MONGO_DETAILS)

db = client["db"]
boards_collection = db["boards"]
items_collection = db["items"]
users_collection = db["users"]
