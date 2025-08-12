from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

# Get the path to the directory this file is in
BASEDIR = os.path.abspath(os.path.dirname(__file__))

# Connect the path with '.env' file name and load it
dotenv_path = os.path.join(BASEDIR, ".env")

if not load_dotenv(dotenv_path):
    raise FileNotFoundError(f"Failed to load .env file at {dotenv_path}")

MONGO_DETAILS = os.environ["MONGO-URI"]

client = AsyncIOMotorClient(MONGO_DETAILS)

db = client["db"]
boards_collection = db["boards"]
items_collection = db["items"]
users_collection = db["users"]
