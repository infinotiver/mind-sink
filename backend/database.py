from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv


MONGO_DETAILS = os.environ["MONGO-URI"]

client = AsyncIOMotorClient(MONGO_DETAILS)

db = client["db"]
boards_collection = db["boards"]
items_collection = db["items"]
users_collection = db["users"]
