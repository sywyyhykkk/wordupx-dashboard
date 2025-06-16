import { request } from '../request';

export function fetchNextDueCard(deckId: string) {
  return request<{ decks: App.WordUpx.Deck[] } & Api.Common.PaginatingCommonParams>({
    url: `/api/decks/${deckId}/next-due-card`,
    method: 'get'
  });
}
