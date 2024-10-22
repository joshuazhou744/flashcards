import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import './FlashcardPage.css'

const url = "http://localhost:8000/api"

interface Card {
  id: number;
  front: string;
  back: string; // if there's a back property
}

export default function FlashcardPage() {

  const [loading, setLoading] = useState(false)
  const [deck, setDeck] = useState<Card[]>([]);
  const {deckName} = useParams<{deckName: string}>()

  useEffect(() => {
    setLoading(true)
    axios.get(`${url}/deck/get_deck/${deckName}`)
    .then(res => {
      let resDeck = res.data.deck
      setDeck(resDeck)
      setLoading(false)
    })
    .catch(() => setLoading(false))
  }, [deckName])

  const handleDelete = (id: number) => {
    setDeck(prevDeck => prevDeck.filter(card => card.id !== id));
    axios.delete(`${url}/delete_card/${deckName}/${id}`)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => console.error("There was an error", err))
  }

  return (
    <div>
       <div className="cards-container">
        {loading ? (
            <p>Loading</p>
          ): deck.length > 0 ? (
            deck.map((card) => (
              <div className="list-flashcard" key={card.id}>
                <div className="card-flip-container">
                  <div className="card-content">
                    <div className="card-face card-front">{card.front}</div>
                    <div className="card-face card-back">{card.back}</div>
                  </div>
                </div>
                <button 
                className="delete-button" 
                onClick={() => handleDelete(card.id)}>
                  Delete
                </button>  
              </div>
            ))
          ) : (
            <p>No cards available, please create one</p>
          )}
      </div>
    </div>
  )
}
