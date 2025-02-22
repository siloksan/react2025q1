import { COOKIE_KEYS, CookieKeys } from '@/constants/cookie';
import { Themes } from '@/context/theme-context/theme.constants';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

interface SetCookieOptions {
  res: Response;
  value: Themes;
  key?: CookieKeys;
  days?: number;
  path?: string;
}

function setCookie({
  res,
  value,
  key = COOKIE_KEYS.THEME,
  days = 365,
  path = '/',
}: SetCookieOptions) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const age = date.toUTCString();

  res.headers.set(
    'Set-Cookie',
    `${key}=${value}; Path=${path}; Max-Age=${age}`
  );
}

async function getTheme(cookies: () => Promise<ReadonlyRequestCookies>) {
  const theme = (await cookies()).get(COOKIE_KEYS.THEME)?.value;

  if (!theme) {
    setCookie({
      res: new Response(),
      value: Themes.light,
    });

    return Themes.light;
  }

  return theme as Themes;
}

export const ServerCookieManager = { getTheme, setCookie };
