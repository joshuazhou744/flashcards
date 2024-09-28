import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import "./DeckPage.css"


const url = "http://localhost:8000/api"

export default function DeckPage() {

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

          <button className="view-cards">
            View Cards
          </button>
        </div>
      </div>
    </div>
  )
}
