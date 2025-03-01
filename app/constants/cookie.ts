export const COOKIE_KEYS = {
  THEME: 'theme',
} as const;

export type CookieKeys = (typeof COOKIE_KEYS)[keyof typeof COOKIE_KEYS];
