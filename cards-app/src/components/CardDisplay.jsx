import { useState, useEffect } from 'react';
import './CardDisplay.css';

function CardDisplay({ card, label, shouldFlip }) {
    
    const [flipped, setFlipped] = useState(false);
    
    useEffect( () => {
        if(shouldFlip && card){
            const timer = setTimeout(() => setFlipped(true), 50);
            return () => clearTimeout(timer);
        }
    }, [card, shouldFlip]);

    return (

        <div className="card-container">
            <h3>{label}</h3>

            <div className={`card ${flipped ? 'flipped' : ''}`}>
                <div className="card-face card-back">
                    <p>No card</p>
                </div>


                <div className="card-face card-front">
                    {card && (
                        <>
                            <img src={card.image} alt={`${card.value} of ${card.suit}`} />
                            <p className='card-title'>{card.value} of {card.suit}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CardDisplay;