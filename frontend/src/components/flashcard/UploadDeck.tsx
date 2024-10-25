import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./UploadDeck.css"

interface Flashcard {
    id: number;
    front: string;
    back: string;
    score: number;
}

const url = "http://localhost:8000/api"

const UploadDeck: React.FC = () => {

    const {deckName} = useParams<{deckName: string}>()
    const {currentId} = useParams<{currentId: string}>()
    const [cardId, setCardId] = useState(parseInt(currentId ?? "0"));
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [fileName, setFileName] = useState("No file chosen");


    const handlFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && file.type == "text/xml") {
            const reader = new FileReader()
            reader.onload = async (e) => {
                const text = e.target?.result
                if (typeof text == "string") {
                    parseXML(text)
                }
            }
            reader.readAsText(file)
            setFileName(file.name);
        } else {
            alert("Upload a valid XML file")
        }
    }

    const parseXML = (xmlString: string) => {
        const parser = new DOMParser()
        const xml = parser.parseFromString(xmlString, 'application/xml')
        const cards = Array.from(xml.querySelectorAll('card'))

        let idCounter = cardId-1;
        const parsedCards: Flashcard[] = cards.map((card) => {
            const text = card.querySelector('text[name="Text"]')?.textContent || '';
            const translation = card.querySelector('text[name="Translation"]')?.textContent || ''
            idCounter++
            return {
                id: idCounter,
                front: text,
                back: translation,
                score: 0
            }
        })
        setFlashcards(parsedCards);
        setCardId(idCounter);
    }

    const handleSubmit = async () => {
        if (flashcards.length == 0) {
            alert("No file uploaded")
            return;
        }
        try {
            const response = await axios.post(`${url}/deck/add_many_cards/${deckName}`, flashcards, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(response)
            alert("Cards uploaded successfully")
            handleClear()
        } catch (error) {
            console.error(error)
        }
    }
    const handleDelete = async (id: number) => {
        setFlashcards((prev) => 
            prev.filter((item) => 
                item.id !== id
            )
        )
    }

    const handleClear = async () => {
        setFlashcards([])
        setFileName("No file chosen")
        const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
        if (fileInput) {
            fileInput.value = "";
        }
    }

    return (
        <div className='main'>
            <h2>Upload XML Files to {deckName}</h2>
            <div className="upload-section">
                <input className="input" type="file" accept=".xml" onChange={handlFileUpload} id="fileUpload" style={{display: 'none'}}></input>
                <div className="upload-files">
                    <label className='custom-label' htmlFor='fileUpload'>Choose File</label>
                    <div>{fileName}</div>
                    <button className='clear-button' onClick={handleClear}>Clear</button>
                </div>
                <button className="submit" onClick={handleSubmit}>Upload to Deck</button>
            </div>
            <div className="cards-container">
                {
                    flashcards.length > 0 ? (
                    flashcards.map((card) => (
                        <div className="list-flashcard" key={card.id}>
                            <div className="card-content">
                                <div className="card-face card-front">{card.front}</div>
                                <div className="card-face card-back">{card.back}</div>
                            </div> 
                            <button 
                            className="delete-button" 
                            onClick={() => handleDelete(card.id)}>
                            Delete
                            </button> 
                        </div>
                    ))
                    ) : (
                    <p>No cards available</p>
                )}
            </div>
        </div>
    )
}

export default UploadDeck
