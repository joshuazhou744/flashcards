import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"
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
  const [cards, setCards] = useState<Flashcard[]>([])
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  const getRandomCards = (deck: Flashcard[]) => {
    if (deck.length <= 10) {
      return shuffle(deck)
    } else {
      let newArray = shuffle(deck).slice(0,10)
      return newArray
    }
  }

  const shuffle = (array: Flashcard[]) => {
    let currentIndex = array.length

    while (currentIndex != 0) {
      let random = Math.floor(Math.random() * currentIndex)
      currentIndex--;

      [array[currentIndex], array[random]] = [array[random], array[currentIndex]]
    }
    return array;
  }

  useEffect(() => {
    setLoading(true)
    axios.get(`${url}/deck/get_deck/${deckName}`)
    .then(res => {
      setDeck(res.data.deck)
      setCards(getRandomCards(res.data.deck))
      setLoading(false)
    })
    .catch(() => setLoading(false))
  }, [deckName, reload])

  const nextCard = () => {
    setCurrent((prev) => {
      if (prev === cards.length - 1) {
        setTimeout(() => {
          setCards(getRandomCards(deck))
          setReload(!reload)
          navigate(`/deck/${deckName}`)
        }, 0)
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
      ) : cards.length > 0 ? (
        <>
          <Flashcard flashcard={cards[current]} key={cards[current].id} />
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
