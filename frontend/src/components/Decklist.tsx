import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
import "./Decklist.css"

const url = "http://localhost:8000/api"

export default function Decklist() {

  const [decks, setDecks] = useState<[]>([])
  const [newDeck, setNewDeck] = useState<string>("")
  const [invalid, setInvalid] = useState<boolean>(false)

  // fetch decks on start
  useEffect(() => {
    axios.get(`${url}/get_decks`)
    .then(res => {
      setDecks(res.data.decks)
    })
  }, [newDeck])

  const handleCreate = () => {
    if (newDeck.trim() !== "") {
      axios.post(`${url}/create_deck/${newDeck}`)
        .then(res => {
          setNewDeck("")
          setInvalid(false)
        })
        .catch(error => {
          console.error(error)
        })
    } else {
      setInvalid(true)
    }
  }

  return (
    <div className="main">
      <div className="header">
        <h1 className="title">Decks</h1>
        <div className="create-deck">
          <input 
            type="text"
            value={newDeck}
            onChange={(e) => {
              setNewDeck(e.target.value)
              if (e.target.value.trim() !== "") {
                setInvalid(false)
              }
            }}
            placeholder="New Deck Name"
          />
          <button onClick={handleCreate} disabled={invalid || newDeck.trim() === ""}>+</button>
        </div>
      </div>

      <div className="decks-container">
        {decks.length > 0 ? (
          decks.map((deck) => (
            <Link className="card" to={`/deck/${deck}`} key={deck}>
              <div>{deck}</div>
            </Link>
        ))
      ) : (
        <p>No deck available, please create one</p>
      )}
      </div>
    </div>
  )
}

