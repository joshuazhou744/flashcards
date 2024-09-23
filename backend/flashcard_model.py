from pydantic import BaseModel

class Flashcard(BaseModel):
    id: int
    front: str
    back: str
    score: int