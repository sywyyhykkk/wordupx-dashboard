import { request } from '../request';

export function fetchNextDueCard(deckId: string) {
  return request<{ decks: App.WordUpx.Deck[] } & Api.Common.PaginatingCommonParams>({
    url: `/api/decks/${deckId}/next-due-card`,
    method: 'get'
  });
}

export function fetchReviewCard(deckId: string, cardIndex: number, interval: number) {
  return request({
    url: `/api/decks/${deckId}/cards/${cardIndex}`,
    method: 'patch',
    data: {
      interval
    }
  });
}
