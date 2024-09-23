import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Decklist from "./components/Decklist"
import DeckPage from "./components/DeckPage"

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Decklist />}/>
        <Route path="/deck/:deckId" element={<DeckPage />} />
      </Routes>
    </Router>
  )
}

export default App
