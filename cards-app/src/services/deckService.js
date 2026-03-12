import { BASE_URL } from "../constants";

async function fetchDeckApi(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Deck API request failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Unable to fetch deck data. ${error.message}`);
  }
}

// Initialize and shuffle deck
export async function initializeDeck() {
  return fetchDeckApi(`${BASE_URL}/new/shuffle/?deck_count=1`);
}

// Draw one card
export async function drawCard(deckId) {
  return fetchDeckApi(`${BASE_URL}/${deckId}/draw/?count=1`);
}