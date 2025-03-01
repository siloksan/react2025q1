import { createCookie } from 'react-router';
import { COOKIE_KEYS } from '~/constants/cookie';
import { Themes } from '~/context/theme-context/theme.constants';

export const MAX_AGE = 365 * 24 * 60 * 60 * 1000;

export const cookieTheme = createCookie(COOKIE_KEYS.THEME, {
  path: '/',
  httpOnly: true,
  secure: true,
  maxAge: MAX_AGE,
});

export async function getTheme(request: Request) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = await cookieTheme.parse(cookieHeader);

  if (
    cookie?.[COOKIE_KEYS.THEME] &&
    Object.values(Themes).includes(cookie[COOKIE_KEYS.THEME])
  ) {
    return cookie[COOKIE_KEYS.THEME] as Themes;
  }

  return Themes.light;
}
