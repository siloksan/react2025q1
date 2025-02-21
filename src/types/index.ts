import { NextRequest } from 'next/server';

export type WithTestId<T = object> = T & { testid?: string };
export type NextApiRequestWithQuery<T> = NextRequest & { query: T };
export type NextApiRequestWithBody<T> = NextRequest & {
  json: () => Promise<T>;
};
