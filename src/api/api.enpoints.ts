export const API_ENDPOINTS = {
  SPACECRAFTS: 'spacecraft/search',
  SPACECRAFT: 'spacecraft',
} as const;

export type ApiEndpoints = (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS];
