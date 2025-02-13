import { COOKIE_KEYS, CookieKeys } from '@/constants/cookie';
import { Themes } from '@/context/theme.constants';
import { ServerResponse } from 'http';
import { GetServerSidePropsContext } from 'next';

interface SetCookieOptions {
  res: ServerResponse;
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
  res.setHeader('Set-Cookie', `${key}=${value}; Path=${path}; Max-Age=${age}`);
}

function getTheme(context: GetServerSidePropsContext) {
  const theme = context.req.cookies[COOKIE_KEYS.THEME];

  if (!theme) {
    setCookie({
      res: context.res,
      value: Themes.light,
    });

    return Themes.light;
  }

  return theme as Themes;
}

export const ServerCookieManager = { getTheme, setCookie };
