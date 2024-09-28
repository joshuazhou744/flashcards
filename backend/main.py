from fastapi import FastAPI
import motor.motor_asyncio
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import pprint
import os
from flashcard_model import Flashcard

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

# HELPER FUNCTIONS

def get_db():
    return client[db_name]

def get_deck(deck):
    db = get_db()
    return db[deck]

# GET REQUESTS

@app.get("/api/get_decks")
async def get_deck_names():
    db = get_db()
    names = await db.list_collection_names()
    return {"decks": names}

@app.get("/api/deck/get_deck/{deck_name}")
async def get_cards_from_deck(deck_name: str):
    deck = get_deck(deck_name)
    cursor = deck.find({})  
    cards = []
    async for document in cursor:
        document["_id"] = str(document["_id"])
        cards.append(document)
    return {"deck": cards}

# POST REQUESTS

@app.post("/api/create_deck/{deck_name}")
async def create_deck(deck_name: str):
    db = get_db()
    deck_list = await db.list_collection_names()
    if deck_name not in deck_list:
        await db.create_collection(deck_name)
        return {"message": f"Created deck {deck_name}"}
    else:
        return {"message": f"Deck {deck_name} already exists"}
    
@app.delete("/api/delete_deck/{deck_name}")
async def del_deck(deck_name: str):
    db = get_db()
    deck_list = await db.list_collection_names()
    if deck_name in deck_list:
        await db.drop_collection(deck_name)
        return {"message": f"Deleted deck {deck_name}"}
    else:
        return {"message": f"Deck {deck_name} does not exist"}
    
@app.post("/api/deck/add_card/{deck_name}")
async def add_card(deck_name: str, card: Flashcard):
    document = card.dict()
    deck = get_deck(deck_name)
    result = await deck.insert_one(document)
    return {"message": f"Added {card.front} to {deck_name}"}



# PUT REQUESTS

@app.put("/api/deck/update_score/{deck_name}/{card_id}/{new_score}")
async def update_score(deck_name: str, card_id: int, new_score: int):
    deck = get_deck(deck_name)
    result = await deck.update_one({"id": card_id}, {"$set": {"score": new_score}})
    print("updated %s document" % result.modified_count)
    new = await deck.find_one({"id": card_id})
    print("document is now %s" % pprint.pformat(new))
    return {"message": "Changed score"}