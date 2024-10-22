import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Decklist from "./components/deck/Decklist"
import DeckPage from "./components/deck/DeckPage"
import "./App.css"
import FlashcardList from "./components/flashcard/FlashcardList"
import FlashcardPage from "./components/flashcard/FlashcardPage"

function App() {  
  const navigate = useNavigate();

  return (
    <>
      <div className="nav-header">
        <Link to="/" className="nav-button">
          Home
        </Link>
        <button className="nav-button" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      <Routes>
        <Route path="/" element={<Decklist />}/>
        <Route path="/deck/:deckName" element={<DeckPage />} />
        <Route path="/deck/:deckName/practice" element={<FlashcardList />}/>
        <Route path="/deck/:deckName/cards" element={<FlashcardPage />}/>
      </Routes>
    </>
  )
}

function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Root;
