import Flashcard from "./Flashcard";

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
  return (
    <div className="card-grid">
      {flashcards.map(flashcard => {
        return <Flashcard flashcard={flashcard} key={flashcard.id} />
      })}
    </div>
  )
}
