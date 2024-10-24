import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import './FlashcardPage.css'

const url = "http://localhost:8000/api"

interface Card {
  id: number;
  front: string;
  back: string; // if there's a back property
  score: number
}

export default function FlashcardPage() {

  const [loading, setLoading] = useState(false)
  const [deck, setDeck] = useState<Card[]>([]);
  const {deckName} = useParams<{deckName: string}>()
  const [front, setFront] = useState("")
  const [back, setBack] = useState("")
  const [currentId, setCurrentId] = useState(1)

  useEffect(() => {
    setLoading(true)
    axios.get(`${url}/deck/get_deck/${deckName}`)
    .then(res => {
      let resDeck = res.data.deck
      console.log(resDeck)
      setDeck(resDeck)
      const maxId = resDeck.reduce((max: number, card: Card) => {
        if (card.id > max) {
          return card.id
        }
        return max
      }, 0)
      setCurrentId(maxId + 1)
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

  const createCard = (e: React.FormEvent) => {
    e.preventDefault()
    if (front.trim() === "" || back.trim() === "") {
      alert("Both front and back fields are required.");
      return;
    }
    const newFlashcard: Card = {
      id: currentId,
      front: front,
      back: back,
      score: 0,
    }
    setCurrentId(prev => prev + 1)
    setFront("")
    setBack("")
    uploadCard(newFlashcard)
    setDeck(prevDeck => [...prevDeck, newFlashcard]);
  }

  const uploadCard = async (card: Card) => {
    try {
      const response = await axios.post(`${url}/deck/add_card/${deckName}`, card);
      console.log("Card uploaded", response.data)
    } catch (error) {
      console.error(error)
    }

  }

  return (
    <div className="flashcard-page">
      <h2>{deckName} - Flashcards</h2>

      <div className="main-container">
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
              <p>No cards available</p>
            )}
        </div>

        <form className="flashcard-form" onSubmit={createCard}>
          <div className="form-group">
            <label htmlFor="front">Front:</label>
            <input
              type="text"
              id="front"
              value={front}
              onChange={(e) => setFront(e.target.value)}
              required
              placeholder="Enter front text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="back">Back:</label>
            <input
              type="text"
              id="back"
              value={back}
              onChange={(e) => setBack(e.target.value)}
              required
              placeholder="Enter back text"
            />
          </div>
          <button type="submit" className="add-button">Add Flashcard</button>
        </form>
      </div>
    </div>
  )
}
