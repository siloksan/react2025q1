export const QUERY_KEYS = {
  PAGE: 'page',
  NAME: 'name',
} as const;

export type QueryKeys = (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS];
