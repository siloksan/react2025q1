export const BASE_URL = 'https://stapi.co/api/v2/rest/';

export const API_ROUTES = {
  STAR_SHIPS: 'spacecraft/search',
  STAR_SHIP: 'spacecraft',
} as const;

export type ApiRoutes = (typeof API_ROUTES)[keyof typeof API_ROUTES];
