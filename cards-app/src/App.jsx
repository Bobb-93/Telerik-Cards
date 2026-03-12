import { useEffect, useState, useMemo, useCallback } from 'react'
import { initializeDeck, drawCard } from './services/deckService'
import ProressIndicator from './components/ProgressIndicator'
import CardDisplay from './components/CardDisplay'

import './App.css'
import { totalCards } from './constants'

function App() {
  
  const [deckId, setDeckId] = useState(null);
  const [previousCard, setPreviousCard] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [valueMatches, setvalueMatches] = useState(0);
  const [suitMatches, setSuitMatches] = useState(0);
  const [cardsRemaining, setCardsRemaining] = useState(52);
  const [error, setError] = useState("");

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

  // Initialize deck on load
  useEffect(() => {
    const setupDeck = async () => {
      try {
        setError("");
        const data = await initializeDeck();
        setDeckId(data.deck_id);
      } catch (err) {
        setError(err.message || "Failed to initialize deck.");
      }
    };
    setupDeck();
  }, []);

  // Draw card handler
  const handleDraw = useCallback(async () => {
    if (!deckId) return;
    try {
      setError("");
      const data = await drawCard(deckId);
      if (data.remaining === 0) {
        setCardsRemaining(0);
      } else {
        setCardsRemaining(data.remaining);
      }
      const newCard = data.cards[0];
      if (currentCard) {
        setPreviousCard(currentCard);
        // Compare values
        if (newCard.value === currentCard.value) {
          setvalueMatches(prev => prev + 1);
        } else if (newCard.suit === currentCard.suit) {
          setSuitMatches(prev => prev + 1);
        }
      }
      setCurrentCard(newCard);
    } catch (err) {
      setError(err.message || "Failed to draw card.");
    }
  }, [deckId, currentCard]);

  return (
    <div className='app'>
      <h1>Deck of Cards</h1>

      {error && <div className='error' style={{ color: 'red', marginBottom: 12 }}>{error}</div>}

      <ProressIndicator
        cardsRemaining={cardsRemaining}
        totalCards={totalCards}
      />

      <div className='cards-wrapper'>
        <CardDisplay key={previousCard?.code} card={previousCard} label='Previous Card' shouldFlip={false} />
        <CardDisplay key={currentCard?.code} card={currentCard} label='Current Card' shouldFlip={true} />
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
      )}
    </div>
  );
}

export default App;
