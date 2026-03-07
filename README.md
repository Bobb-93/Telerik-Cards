# Telerik-Cards

1. To start the project use the terminal when **D:\repos\Telerik-Cards\cards-app** is opened, run the command `npm-run-dev` and press **O + Enter** to open in browser.
2. Data is fetched by using **fetch** in **deckService.js** in the two lines: ``const response = await fetch(\`${BASE_URL}/new/shuffle/?deck_count=1\`);`` and ``const response = await fetch(\`${BASE_URL}/${deckId}/draw/?count=1\`);``
3. State is managed by using the `deckId`, `previousCard`, `currentCard`, `valueMatches`, `suitMatches` and `cardsRemaining` variables in **App.jsx**.
4. The components **CardDisplay.jsx** and **ProgressIndicator** are used in **App.jsx**.
5. Originally **CardDisplay.jsx** was the only component, but I separated the progress indicator to be in another component: **ProgressIndicator.jsx**. 