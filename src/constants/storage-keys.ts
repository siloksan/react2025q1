export const LOCALE_STORAGE_KEYS = {
  SEARCH_TERM: 'searchTerm',
  QUERY_PARAMS: 'queryParams',
} as const;

export type StorageKeys =
  (typeof LOCALE_STORAGE_KEYS)[keyof typeof LOCALE_STORAGE_KEYS];
