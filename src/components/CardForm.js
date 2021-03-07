import React, { useState } from 'react';
import { saveCard } from '../services/cardService';

export function CardForm({ onSave, onCancel, card }) {
  const id = card && card.id ? card.id : undefined;

  const [term, setTerm] = useState(id ? card.term : '');
  const [definition, setDefinition] = useState(id ? card.definition : '');

  function handleSubmit(event) {
    event.preventDefault();
    saveCard({ term, definition, id }).then(card => {
      clearForm();
      onSave && typeof onSave === 'function' && onSave(card);
    });
  }

  function clearForm() {
    setTerm('');
    setDefinition('');
    onCancel && typeof onCancel === 'function' && onCancel();
  }

  function handleTermChange(event) {
    const { value } = event.target;
    setTerm(value);
  }

  function handleDefChange(event) {
    const { value } = event.target;
    setDefinition(value);
  }

  return (
    <div className="preview preview_front">
      <h4 className="form_title">{id ? 'Update Card' : 'Add Card'}</h4>
      <form className="form" onReset={clearForm} onSubmit={handleSubmit}>
        <div>
          <label
            className="form_text-title"
            htmlFor={`card_term_${id ? id : 'new'}`}
          >
            Term
          </label>
          <textarea
            className="form_text"
            id={`card_term_${id ? id : 'new'}`}
            value={term}
            onChange={handleTermChange}
          />
        </div>
        <div>
          <label
            className="form_text-title"
            htmlFor={`card_definition_${id ? id : 'new'}`}
          >
            Definition
          </label>
          <textarea
            className="form_text"
            id={`card_definition_${id ? id : 'new'}`}
            value={definition}
            onChange={handleDefChange}
          />
        </div>
        <div className="btn_form">
          <button type="submit" className="btn">
            Save
          </button>
          <button type="reset" className="btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
