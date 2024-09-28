import { useParams, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import "./DeckPage.css"
import FlashcardList from "./FlashcardList"


const url = "http://localhost:8000/api"

export default function DeckPage() {

  const {deckName} = useParams<{deckName: string}>()
  const [deck, setDeck] = useState<{id:number, front: string, back:string, score:number}[]>([])

  useEffect(() => {
    axios.get(`${url}/deck/get_deck/${deckName}`)
    .then(res => {
      setDeck(res.data.deck)
    })
  }, [deckName])

  return (
    <div className="deck-main">
      <h1>{deckName}</h1>
      <button className="practice-deck">
          Practice
        </button>
      <div className="deck-options">
        <button className="delete-deck" >
          Delete Deck
        </button>

        <button className="view-cards">
          View Cards
        </button>
      </div>
    </div>
  )
}
