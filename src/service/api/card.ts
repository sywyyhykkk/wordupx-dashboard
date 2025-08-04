import { request } from '../request';

export function fetchNextDueCard(deckId: string) {
  return request<App.WordUpx.Card>({
    url: `/api/decks/${deckId}/next-due-card`,
    method: 'get'
  });
}

interface UpdateCardPayload {
  interval?: number;
  hidden?: boolean;
}

export function fetchUpdateCard(deckId: string, cardIndex: number, data: UpdateCardPayload) {
  // TODO Update cards
  const prefix = 'update-visibility';
  return request({
    url: `/api/decks/${deckId}/cards/${cardIndex}/${prefix}`,
    method: 'patch',
    data
  });
}

export function fetchAllCards(deckId: string) {
  return request({
    url: `/api/decks/${deckId}/cards`,
    method: 'get'
  });
}
