from fastapi import FastAPI
import motor.motor_asyncio
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import pprint
import os

load_dotenv()
DATABASE_URI = os.getenv("DATABASE_URI")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = motor.motor_asyncio.AsyncIOMotorClient(DATABASE_URI)
db_name = "flashcards"

def get_db():
    return client[db_name]

def get_deck(deck):
    db = get_db()
    return db[deck]

@app.get("/api/get_decks")
async def get_deck_names():
    db = get_db()
    names = await db.list_collection_names()
    decks = []
    for i in range(len(names)):
        decks.append({"id": i, "name": names[i]})
    return {"decks": decks}

@app.post("/api/create_deck")
async def create_deck(deck_name: str):
    db = get_db()
    deck_list = await db.list_collection_names()
    if deck_name not in deck_list:
        await db.create_collection(deck_name)
        return {"message": f"Created deck {deck_name}"}
    else:
        return {"message": f"Deck {deck_name} already exists"}