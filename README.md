# Telerik-Cards

Game with cards from the: [Deck of Cards API](https://deckofcardsapi.com):
- The user draws a card from a shuffled deck
- After drawing a new card:
  - If the value of the new card matches the value of the previous card, display 'SNAP VALUE!'
  - If the suit of the new card matches the suit of the previous card, display: 'SNAP SUIT!'
  - If neither the value nor the suit match, display no message.
- On the screen the user sees:
  - Previous card
  - Current card
  - Match message
  - Counters
  - Draw button
  - Progress indicator

1. The project requires installation of:
   1. NPM - run the command `npm install` in the directory **\Telerik-Cards\cards-app**
   2. Vite - run `npm create vite@latest`
2. To start the project use the terminal when **\Telerik-Cards\cards-app** is opened, run the command `npm run dev` and press **O + Enter** to open in browser.
3. Data is fetched by using **fetch** in **deckService.js** in the two lines: ``const response = await fetch(\`${BASE_URL}/new/shuffle/?deck_count=1\`);`` and ``const response = await fetch(\`${BASE_URL}/${deckId}/draw/?count=1\`);``
4. State is managed by using the `deckId`, `previousCard`, `currentCard`, `valueMatches`, `suitMatches` and `cardsRemaining` variables in **App.jsx**.
5. The components **CardDisplay.jsx** and **ProgressIndicator** are used in **App.jsx**.
6. Originally **CardDisplay.jsx** was the only component, but I separated the progress indicator to be in another component: **ProgressIndicator.jsx**. 