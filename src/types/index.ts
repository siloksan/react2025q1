import { NextApiRequest } from 'next';

export type WithTestId<T = object> = T & { testid?: string };
export type NextApiRequestWithQuery<T> = NextApiRequest & { query: T };
export type NextApiRequestWithBody<T> = NextApiRequest & { body: T };
