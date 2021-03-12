import React, { useState } from 'react';
import { destroyCard } from '../services/cardService';
import { CardForm } from './CardForm';

export function CardPreview({ onRemove, onUpdate, ...card }) {
  const [isEditMode, setIsEditMode] = useState(false);
  function handleToggleEdit() {
    setIsEditMode(current => !current);
  }
  return isEditMode ? (
    <CardForm onCancel={handleToggleEdit} onSave={onUpdate} card={card} />
  ) : (
    <View {...card} onEdit={handleToggleEdit} onRemove={onRemove} />
  );
}

export const View = ({ id, term, definition, onEdit, onRemove }) => {
  const [isFront, setIsFront] = useState(true);

  function handleCardFlip() {
    setIsFront(current => !current);
  }

  function handleDelete() {
    const confirm = window.confirm(`Are you sure wish to delete "${term}"?`);
    if (confirm) {
      destroyCard(id).then(() => {
        onRemove && typeof onRemove === 'function' && onRemove(id);
      });
    }
  }

  return (
    <div
      className={`preview preview_front ${
        isFront ? '' : 'preview preview_back'
      }`}
    >
      <h4 className="preview_term">{isFront ? term : definition}</h4>
      <div className="preview_btns">
        <button type="button" className="btn" onClick={handleCardFlip}>
          {isFront ? 'Show back' : 'Show front'}
        </button>
        <div>
          <button type="button" className="btn" onClick={onEdit}>
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
