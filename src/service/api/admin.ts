import { request } from '../request';

/** fetchAllUsers */

export function fetchAllUsers() {
  return request<App.WordUpx.User[] & Api.Common.PaginatingCommonParams>({
    url: '/admin/api/users',
    method: 'get'
  });
}

/** fetchAllDecks */

export function fetchAllDecks() {
  return request<{ decks: App.WordUpx.Deck[] } & Api.Common.PaginatingCommonParams>({
    url: '/admin/api/decks',
    method: 'get'
  });
}
