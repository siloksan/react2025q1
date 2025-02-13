import { HTTP_CODES, HTTP_ERRORS, RequestMethod } from '@/api/api-constants';
import { Themes } from '@/context/theme.constants';
import { NextApiRequestWithBody } from '@/types';
import { ServerCookieManager } from '@/utils/server-cookie-manager';
import { NextApiResponse } from 'next';

interface Body {
  theme: Themes;
}

export default function handler(
  req: NextApiRequestWithBody<Body>,
  res: NextApiResponse
) {
  if (req.method !== RequestMethod.POST) {
    return res
      .status(HTTP_CODES.NOT_ALLOWED)
      .json({ message: HTTP_ERRORS[HTTP_CODES.NOT_ALLOWED] });
  }

  const { theme } = req.body;

  ServerCookieManager.setCookie({
    res,
    value: theme,
  });

  return res
    .status(HTTP_CODES.OK)
    .json({ message: HTTP_ERRORS[HTTP_CODES.OK] });
}
