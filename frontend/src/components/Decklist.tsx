import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
import "./Decklist.css"

const url = "http://localhost:8000/api"

export default function Decklist() {

  const [decks, setDecks] = useState<[]>([])

  useEffect(() => {
    axios.get(`${url}/get_decks`)
    .then(res => {
      setDecks(res.data.decks)
    })
  }, [decks])

  return (
    <div className="main">
      <h2 className="title">Decks</h2>
      <div className="decks-container">
        {decks.length > 0 && decks.map((deck) => (
            <Link className="card" to={`/deck/${deck}`} key={deck}>
              <div>{deck}</div>
            </Link>
        ))}
      </div>
    </div>
  )
}

