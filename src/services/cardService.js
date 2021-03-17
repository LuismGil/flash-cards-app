export function getCards() {
  return fetch('/flash-cards-app/api/card').then(res => res.json());
}

export function destroyCard(id) {
  return fetch(`/flash-cards-app/api/card/${id}`, { method: 'DELETE' });
}

export function saveCard(card) {
  return card.id ? updateCard(card) : createCard(card);
}

export function createCard(card) {
  return fetch('/flash-cards-app/api/card', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(card),
  }).then(res => res.json());
}

function updateCard(card) {
  return fetch(`/flash-cards-app/api/card/${card.id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(card),
  }).then(res => res.json());
}
