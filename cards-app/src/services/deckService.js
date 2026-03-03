const BASE_URL = "https://deckofcardsapi.com/api/deck";

// Initialize and shuffle deck
export async function initializeDeck() {
  const response = await fetch(`${BASE_URL}/new/shuffle/?deck_count=1`);
  const data = await response.json();
  return data;
}

// Draw one card
export async function drawCard(deckId) {
  const response = await fetch(`${BASE_URL}/${deckId}/draw/?count=1`);
  const data = await response.json();
  return data;
}