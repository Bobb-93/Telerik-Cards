function CardDisplay({card, label}){
    return (
        <div className="card-container">
            <h3>{label}</h3>

            {card ? (
                <>
                    <img src={card.image} alt={`${card.value} of ${card.suit}`} />
                    <p>{card.value} of {card.suit}</p>
                </>
            ) : (
                <div className="placeholder">
                    <p>No card</p>
                </div>
            )}
        </div>
    );
}

export default CardDisplay;