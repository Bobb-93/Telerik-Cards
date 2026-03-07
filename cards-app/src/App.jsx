import { useEffect, useState, useMemo, useCallback } from 'react'
import { initializeDeck, drawCard } from './services/deckService'
import ProressIndicator from './components/ProgressIndicator'
import CardDisplay from './components/CardDisplay'

import './App.css'

function App() {

  const [deckId, setDeckId] = useState(null);
  const [previousCard, setPreviousCard] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [valueMatches, setvalueMatches] = useState(0);
  const [suitMatches, setSuitMatches] = useState(0);
  const [cardsRemaining, setCardsRemaining] = useState(52);

  const totalCards = 52;

  const message = useMemo(() => {
    if (!previousCard || !currentCard) return "";

    if (previousCard.value === currentCard.value) {
      return 'SNAP VALUE!';
    }

    if (previousCard.suit === currentCard.suit) {
      return 'SNAP SUIT!';
    }

    return "";
  }, [previousCard, currentCard]);

  //Initialize deck on load
  useEffect(() => {

    const setupDeck = async () => {
      const data = await initializeDeck();
      setDeckId(data.deck_id);
    }

    setupDeck();
  }, []);

  // Draw card handler
  const handleDraw = useCallback(async () => {

    if (!deckId) return;

    const data = await drawCard(deckId);

    console.log(data);

    if (data.remaining === 0) {
      setCardsRemaining(0);
    } else {
      setCardsRemaining(data.remaining);
    }

    const newCard = data.cards[0];
    console.log(newCard);

    if (currentCard) {
      setPreviousCard(currentCard);

      //Compare values
      if (newCard.value === currentCard.value) {
        setvalueMatches(prev => prev + 1);
      } else if (newCard.suit === currentCard.suit) {
        setSuitMatches(prev => prev + 1);
      }
    }

    setCurrentCard(newCard);
  }, [deckId, currentCard]);

  return (
    <div className='app'>
      <h1>Deck of Cards</h1>

      <ProressIndicator
        cardsRemaining={cardsRemaining}
        totalCards={totalCards}
      />

      <div className='cards-wrapper'>
        <CardDisplay card={previousCard} label='Previous Card' />
        <CardDisplay card={currentCard} label='Current Card' />
      </div>

      <h2 className='message'>{message}</h2>

      <div className='counters'>
        <p>Value matches: {valueMatches}</p>
        <p>Suit matches: {suitMatches}</p>
      </div>

      {cardsRemaining > 0 ? (
        <button onClick={handleDraw}>Draw card</button>
      ) : (
        <h2>Deck Finished!</h2>
      )
      }
    </div>
  )
}

export default App;
