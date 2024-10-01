import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Decklist from "./components/deck/Decklist"
import DeckPage from "./components/deck/DeckPage"
import "./App.css"
import FlashcardList from "./components/flashcard/FlashcardList"
import FlashcardPage from "./components/flashcard/FlashcardPage"

function App() {


  return (
    <Router>
      <Link to="/" className="home-button">
        Home
      </Link>
      <Routes>
        <Route path="/" element={<Decklist />}/>
        <Route path="/deck/:deckName" element={<DeckPage />} />
        <Route path="/deck/:deckName/practice" element={<FlashcardList />}/>
        <Route path="/deck/:deckName/cards" element={<FlashcardPage />}/>
      </Routes>
    </Router>
  )
}

export default App
