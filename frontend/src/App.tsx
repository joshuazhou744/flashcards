import { useState } from "react"
import FlashcardList from "./components/FlashcardList"

function App() {

  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)

  return (
    <>
      <FlashcardList flashcards={flashcards}/>
    </>
  )
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    front: "front1",
    back: "back1",
    score: 0
  },
  {
    id: 2,
    front: "front2",
    back: "back2",
    score: 0
  }
]

export default App
