import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
import "./Decklist.css"

const url = "http://localhost:8000/api"

export default function Decklist() {

  const [decks, setDecks] = useState<{id: number, name: string }[]>([])
  const [gridColumns, setGridColumns] = useState(1)

  useEffect(() => {
    axios.get(`${url}/get_decks`)
    .then(res => {
      setDecks(res.data.decks)
      calculateGrid(res.data.decks.length)
    })
  }, [])

  const calculateGrid = (length: number) => {
    const sqrt = Math.sqrt(length)
    let rows = Math.floor(sqrt)
    let columns = Math.ceil(sqrt)

    if (rows*columns < length) {
      rows += 1
    }
    setGridColumns(columns)
  }

  return (
    <div className="main">
      <h2 className="title">Decks</h2>
      <div className="container" style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}>
        {decks.map((deck) => (
            <Link className="card" to={`/deck/${deck.id}`} key={deck.id}>
              <div>{deck.name}</div>
            </Link>
        ))}
      </div>
    </div>
  )
}

