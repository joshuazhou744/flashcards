from fastapi import FastAPI
import motor.motor_asyncio
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import pprint
import os

DATABASE_URI = os.environ.get("DATABASE_URI")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_header=["*"],
)

client = motor.motor_asyncio.AsyncIOMotorClient(DATABASE_URI, maxPoolSize=10, serverSelectionTimeoutMS=5000)