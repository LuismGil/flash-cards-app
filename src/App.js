import React, { useEffect, useState } from 'react';
import { Router } from '@reach/router';
import { Practice } from './components/Practice';
import { getCards } from './services/cardService';
import { CardList } from './components/CardList';

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getCards().then(setCards);
  }, []);

  function handleRemove(id) {
    setCards(existing => existing.filter(c => c.id !== id));
  }

  function handleAdd(card) {
    setCards(existing => [...existing, card]);
  }

  function handleUpdate(card) {
    setCards(existing => existing.map(c => (c.id === card.id ? card : c)));
  }

  return (
    <div>
      <header className="app_header">
        <h1 className="app_header_title">Flash Cards</h1>
        <h2 className="app_header_title-secundary">
          Retention Through Repitition
        </h2>
      </header>
      <main>
        <h3 className="app_main_title">Your Cards</h3>
        <Router basename="/flash-cards-app">
          <CardList
            path="/"
            cards={cards}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
          />
          <Practice path="/practice" cards={cards} />
        </Router>
      </main>
    </div>
  );
}

export default App;
