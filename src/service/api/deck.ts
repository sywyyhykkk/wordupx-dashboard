import { request } from '../request';

export function fetchUserDecks() {
  return request<{ decks: App.WordUpx.Deck[] } & Api.Common.PaginatingCommonParams>({
    url: `/api/decks`,
    method: 'get'
  });
}
