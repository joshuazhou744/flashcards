import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"
import Flashcard from "./Flashcard";
import './FlashcardList.css'
import axios from "axios"

interface Flashcard {
    id: number;
    front: string;
    back: string;
    score: number;
}

const url = "http://localhost:8000/api"

export default function FlashcardList() {
  const [current, setCurrent] = useState(0);
  const {deckName} = useParams<{deckName: string}>()
  const [deck, setDeck] = useState<Flashcard[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    axios.get(`${url}/deck/get_deck/${deckName}`)
    .then(res => {
      setDeck(res.data.deck)
      setLoading(false)
    })
    .catch(() => setLoading(false))
  }, [deckName])

  const nextCard = () => {
    setCurrent((prev) => {
      if (prev === deck.length - 1) {
        return 0
      } else {
        return prev + 1
      }
    }
    )
  }

  return (
    <div className="flashcard-container">
      {loading ? (
        <h2>Loading</h2>
      ) : deck.length > 0 ? (
        <>
          <Flashcard flashcard={deck[current]} key={deck[current].id} />
          <button className="next-button" onClick={nextCard}>Next Flashcard</button>
        </>
      ): (
        <>
          <h2>No cards in deck</h2>
          <Link to={`/deck/${deckName}`}>
            <button className="back-button">
              Back
            </button>
          </Link>
        </>
      )}
    </div>
  )
}
