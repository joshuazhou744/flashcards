import { useState } from "react";
import Flashcard from "./Flashcard";
import './FlashcardList.css'

interface Flashcard {
    id: number;
    front: string;
    back: string;
    score: number;
  }
  
  interface FlashcardListProps {
    flashcards: Flashcard[];
  }


export default function FlashcardList({ flashcards }: FlashcardListProps) {
  const [current, setCurrent] = useState(0);

  const nextCard = () => {
    setCurrent((prev) => 
      prev === flashcards.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <div className="flashcard-container">
      <div className="flashcard">
        <Flashcard flashcard={flashcards[current]} key={flashcards[current].id} />
      </div>
      <button className="nextbutton" onClick={nextCard}>Next Flashcard</button>
      
    </div>
  )
}
