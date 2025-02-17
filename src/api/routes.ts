export const BASE_URL = 'https://stapi.co/api/v2/rest/';

export const API_ROUTES = {
  CARDS: 'spacecraft/search',
  STAR_SHIP: 'spacecraft',
} as const;

export type ApiRoutes = (typeof API_ROUTES)[keyof typeof API_ROUTES];

export const CLIENT_ROUTES = {
  CARDS: '/api/cards',
  CARD_DETAILS: (id: string) => `/api/spacecrafts/${id}`,
  SET_THEME: '/api/theme',
} as const;

export const BROWSER_ROUTES = {
  CARDS: '/',
  CARD_DETAILS: (id: string) => `/spacecrafts/${id}`,
} as const;
