import React from 'react';

function Counters({ valueMatches, suitMatches }) {
  return (
    <div className='counters'>
      <p>Value matches: {valueMatches}</p>
      <p>Suit matches: {suitMatches}</p>
    </div>
  );
}

export default Counters;
