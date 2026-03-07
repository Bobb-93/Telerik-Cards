import { useEffect, useState, useMemo, useCallback } from 'react'
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

  // Progress indicator variables
  const totalCards = 52;
  const currentCardNumber = totalCards - cardsRemaining + 1;

  // Probability indicator variables (useRef for mutability)
  const [suitCounts, setSuitCounts] = useState({ hearts: 13, diamonds: 13, spades: 13, clubs: 13 });
  const [valueCounts, setValueCounts] = useState({ '2': 4, '3': 4, '4': 4, '5': 4, '6': 4, '7': 4, '8': 4, '9': 4, '10': 4, 'J': 4, 'Q': 4, 'K': 4, 'A': 4 });

  // const [message, setMessage] = useState('');

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

    async function setupDeck() {
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
      }
      // Decrement value count
      setValueCounts(prevCounts => ({
        ...prevCounts,
        [newCard.value]: prevCounts[newCard.value] > 0 ? prevCounts[newCard.value] - 1 : 0
      }));
      // Decrement suit count
      setSuitCounts(prevCounts => ({
        ...prevCounts,
        [newCard.suit]: prevCounts[newCard.suit] > 0 ? prevCounts[newCard.suit] - 1 : 0
      }));
      if (newCard.suit === currentCard.suit) {
        setSuitMatches(prev => prev + 1);
      }
    } else {
      // First card drawn
      setValueCounts(prevCounts => ({
        ...prevCounts,
        [newCard.value]: prevCounts[newCard.value] > 0 ? prevCounts[newCard.value] - 1 : 0
      }));
      setSuitCounts(prevCounts => ({
        ...prevCounts,
        [newCard.suit]: prevCounts[newCard.suit] > 0 ? prevCounts[newCard.suit] - 1 : 0
      }));
    }

    setCurrentCard(newCard);
  }, [deckId, currentCard]);

  function progressIndicatorWidth(cardsRemaining, currentCardNumber) {
    return ((cardsRemaining === 0 ? totalCards : currentCardNumber) / totalCards) * 100;
  }

  // Probability calculations
  let valueMatchProb = '';
  let suitMatchProb = '';
  if (currentCard && cardsRemaining > 0) {
    const valueLeft = valueCounts[currentCard.value] || 0;
    valueMatchProb = ((valueLeft / cardsRemaining) * 100).toFixed(2) + '%';
    const suitLeft = suitCounts[currentCard.suit] || 0;
    suitMatchProb = ((suitLeft / cardsRemaining) * 100).toFixed(2) + '%';
  } else {
    valueMatchProb = '-';
    suitMatchProb = '-';
  }

  return (
    <div className='app'>
      <h1>Deck of Cards</h1>

      <ProressIndicator
        cardsRemaining={cardsRemaining}
        totalCards={totalCards}
      />

      <div className='probability-indicator'>
        <strong>Probability for a value match: {valueMatchProb}</strong>
        <strong>Probability for a suit match: {suitMatchProb}</strong>
      </div>

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
