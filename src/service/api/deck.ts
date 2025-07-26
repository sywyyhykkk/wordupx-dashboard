import { request } from '../request';

export function fetchUserDecks() {
  return request<{ decks: App.WordUpx.Deck[] }>({
    url: `/api/decks`,
    method: 'get'
  });
}

export function fetchCreateNewDeck(data: App.WordUpx.DeckForm) {
  return request({
    url: `/api/decks`,
    method: 'post',
    data
  });
}
