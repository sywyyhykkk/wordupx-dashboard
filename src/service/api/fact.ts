import { request } from '../request';

export function addFactToDeck(deckId: string, facts: string[][]) {
  return request({
    url: `/api/decks/${deckId}/facts`,
    method: 'post',
    data: {
      facts
    }
  });
}

export function fetchUserFacts(deckId: string) {
  return request<{ facts: string[][] }>({
    url: `/api/decks/${deckId}/facts`,
    method: 'get'
  });
}
