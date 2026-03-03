const BASE_URL = "https://deckofcardsapi.com/api/deck";

export async function initializeDeck() {
  const response = await fetch(`${BASE_URL}/new/shuffle/?deck_count=1`);
  const data = await response.json();
  return data; // contains deck_id
}