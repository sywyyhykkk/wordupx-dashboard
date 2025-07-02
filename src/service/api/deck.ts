import { request } from '../request';

export function fetchUserDecks() {
  return request<{ decks: App.WordUpx.Deck[] } & Api.Common.PaginatingCommonParams>({
    url: `/api/decks`,
    method: 'get'
  });
}

export function createNewDeck(data: App.WordUpx.DeckForm) {
  return request({
    url: `/api/decks`,
    method: 'post',
    data
  });
}
