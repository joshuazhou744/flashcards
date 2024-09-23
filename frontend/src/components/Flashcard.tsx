import {useState} from 'react'
import './Flashcard.css'

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

  const handleRightClick = () => {
    setScore(prevScore => prevScore + 1)
    flashcard.score++
    setButtonClicked(true)
  }

  const handleWrongClick = () => {
    setScore(prevScore => prevScore - 1)
    flashcard.score--
    setButtonClicked(true)
  } 

  return (
    <div className='container'>
      <div
      className={`card ${flip ? 'flip' : ''}`}
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
        <div className="buttons">
          <button onClick={handleRightClick} className="right-btn">Right</button>
          <button onClick={handleWrongClick} className="wrong-btn">Wrong</button>
        </div>
      )}
    </div>
  )
}
