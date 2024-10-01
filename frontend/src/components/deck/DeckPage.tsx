import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import "./DeckPage.css"


interface Flashcard {
  id: number;
  front: string;
  back: string;
  score: number;
}

const url = "http://localhost:8000/api"

export default function DeckPage() {

  const [score, setScore] = useState<number>(-1);
  const {deckName} = useParams<{deckName: string}>()
  const navigate = useNavigate();

  const handleDelete = () => {
    axios.delete(`${url}/delete_deck/${deckName}`)
      .then(res => {
        console.log(res.data)
        navigate("/")
      })
      .catch(err => console.error("There was an error", err))
  }

  useEffect(() => {
    axios.get(`${url}/deck/get_deck/${deckName}`)
    .then(res => {
      let deck = res.data.deck
      let deckScores = []
      for (let i = 0; i < deck.length; i++) {
        deckScores[i] = deck[i].score
      }
      setScore(parseFloat(calculatePercentageScore(deckScores).toFixed(0)))
    })
  }, [deckName])

  function calculatePercentageScore(scores: number[]): number {
    let maxScore = 50;
    const normalizedScores = scores.map(score => (score + maxScore) / (2 * maxScore) * 100);
    const totalPercentage = normalizedScores.reduce((acc, score) => acc + score, 0) / scores.length;
    return totalPercentage;
  }

  return (
    <div className="deck-main">
      <div className="deck-container">
        <h1>{deckName}</h1>
          <Link to={`/deck/${deckName}/practice`} style={{width: "100%"}}>
            <div className="practice-wrapper">
              <button className="practice-deck">
                Practice
              </button>
            </div>
          </Link>
        <div className="deck-options">
          <button className="delete-deck" onClick={handleDelete}>
            Delete Deck
          </button>

          <Link to={`/deck/${deckName}/cards`}>
            <div className="practice-wrapper">
              <button className="view-cards">
                View Cards
              </button>
            </div>
          </Link>
        </div>
        <div className="deckInfo">
          Deck Score: {score}%
        </div>
      </div>
    </div>
  )
}
