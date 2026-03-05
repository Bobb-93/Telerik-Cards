import { useEffect, useState } from 'react'
import { initializeDeck, drawCard } from './services/deckService'
import CardDisplay from './components/CardDisplay'

import './App.css'

function App() {

  const [deckId, setDeckId] = useState(null);
  const [previousCard, setPreviousCard] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [valueMatches, setvalueMatches] = useState(0);
  const [suitMatches, setSuitMatches] = useState(0);
  const [cardsRemaining, setCardsRemaining] = useState(52);
  const [message, setMessage] = useState('');

  //Initialize deck on load
  useEffect(() => {
    
    async function setupDeck() {
      const data = await initializeDeck();
        setDeckId(data.deck_id);
    }

    setupDeck();
  }, []);

  // Draw card handler
  const handlerDraw = async () {
    
    if(!deckId) return;

    const data = await drawCard(deckId);

    console.log(data);
    
    if(data.remaining === 0){
      setCardsRemaining(0);
    } else {
      setCardsRemaining(data.remaining);
    }

    const newCard = data.cards[0];
    console.log(newCard);

    if(currentCard){
      setPreviousCard(currentCard);

      //Compare values
      if(newCard.value === currentCard.value){
        setvalueMatches(prev => prev + 1);
        setMessage('SNAP VALUE!');
      } else if(newCard.suit === currentCard.suit){
        setSuitMatches(prev => prev + 1);
        setMessage('SNAP SUIT!');
      } else {
        setMessage('');
      }
    }

    setCurrentCard(newCard);
  };

  return (
    <div className='app'>
      <h1>Deck of Cards</h1>

      <div className='cards-wrapper'>
        <CardDisplay card={previousCard} label = 'Previous Card' />
        <CardDisplay card={currentCard} label = 'Current Card' />
      </div>
    </div>
  )
}

export default App
