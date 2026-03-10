import { useState, useEffect } from 'react';
import './CardDisplay.css';

function CardDisplay({ card, label, shouldFlip }) {

    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        if (shouldFlip && card) {
            const timer = setTimeout(() => setFlipped(true), 50);
            return () => clearTimeout(timer);
        }
    }, [card, shouldFlip]);

    return (
        <div className="card-container">
            <h3>{label}</h3>

            <div className={`card ${flipped ? 'flipped' : ''}`}>
                <div className="card-face card-back"></div>

                <div className="card-face card-front">
                    {card && (
                        <img src={card.image} alt={`${card.value} of ${card.suit}`} />
                    )}
                </div>
            </div>

            <p className="card-title">
                {card ? `${card.value} of ${card.suit}` : '\u00A0'}
            </p>
        </div>
    );
}

export default CardDisplay;