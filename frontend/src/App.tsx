import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Decklist from "./components/Decklist"
import DeckPage from "./components/DeckPage"
import "./App.css"
import FlashcardList from "./components/FlashcardList"

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
      </Routes>
    </Router>
  )
}

export default App
