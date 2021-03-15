import React from 'react';
import { Link } from '@reach/router';
import { CardForm } from './CardForm';
import { CardPreview } from './CardPreview';

export function CardList({ cards, onAdd, onRemove, onUpdate }) {
  return (
    <div>
      <div className="practiceContainer_link">
        <Link className="practiceContainer_link-title" to="/practice">
          Practice Deck
        </Link>
      </div>
      <div className="cardListContainer">
        <CardForm onSave={onAdd} />
        {cards.map(card => (
          <CardPreview
            key={card.id}
            {...card}
            onUpdate={onUpdate}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
}
