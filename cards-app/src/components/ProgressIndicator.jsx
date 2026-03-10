function ProressIndicator({ cardsRemaining, totalCards }) {

    const currentCardNumber = totalCards - cardsRemaining;

    const progressIndicatorWidth = (currentCardNumber / totalCards) * 100;

    return (
        <div className="progress-indicator">
            <strong>
                Card {currentCardNumber} of {totalCards}
            </strong>

            <div>
                <div style={{ width: `${progressIndicatorWidth}%` }}></div>
            </div>
        </div>
    );
}

export default ProressIndicator;