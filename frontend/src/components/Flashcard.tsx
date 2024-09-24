import {useState} from 'react'
import { useParams } from 'react-router-dom'
import './Flashcard.css'
import axios from 'axios'

const url = "http://localhost:8000/api"

interface Flashcard {
  flashcard: {
    id: number;
    front: string;
    back: string;
    score: number;
  }
}

export default function Flashcard({flashcard}: Flashcard) {

  const [flip, setFlip] = useState(false)
  const [score, setScore] = useState(flashcard.score)
  const [buttonClicked, setButtonClicked] = useState(false)

  const {deckName} = useParams<{deckName: string}>()


  const updateScore = async (newScore: number) => {
    try {
      const response = await axios.put(`${url}/deck/update_score/${deckName}/${flashcard.id}/${newScore}`)
    } catch (error) {
      console.error("Error updating score", error)
    }
  }

  const handleRightClick = () => {
    setScore(prevScore => prevScore + 1)
    flashcard.score++
    setButtonClicked(true)
    updateScore(flashcard.score)
  }

  const handleWrongClick = () => {
    setScore(prevScore => prevScore - 1)
    flashcard.score--
    setButtonClicked(true)
    updateScore(flashcard.score)
  } 

  return (
    <div className='flashcard-container'>
      <div
      className={`flashcard ${flip ? 'flip' : ''}`}
      onClick={() => setFlip(!flip)}
      >
        <div className="front">
          {flashcard.front}
        </div>
        <div className="back">
          {flashcard.back} <br/>
          Score: {score} <br/>
        </div>
      </div>
      {!buttonClicked && flip && (
        <div className="flashcard-buttons">
          <button onClick={handleRightClick} className="right-btn">Right</button>
          <button onClick={handleWrongClick} className="wrong-btn">Wrong</button>
        </div>
      )}
    </div>
  )
}
