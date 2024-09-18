from fastapi import FastAPI
import motor.motor_asyncio
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import pprint
import os

DATABASE_URI = os.environ.get("DATABASE_URI")