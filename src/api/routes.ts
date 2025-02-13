export const BASE_URL = 'https://stapi.co/api/v2/rest/';

export const API_ROUTES = {
  CARDS: 'spacecraft/search',
  STAR_SHIP: 'spacecraft',
} as const;

export type ApiRoutes = (typeof API_ROUTES)[keyof typeof API_ROUTES];

export const CLIENT_ROUTES = {
  CARDS: 'api/get-cards',
  CARD_DETAILS: 'api/cards/get-card-details',
  SET_THEME: 'api/set-theme',
} as const;

export type ClientRoutes = (typeof CLIENT_ROUTES)[keyof typeof CLIENT_ROUTES];
