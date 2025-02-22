import { HTTP_CODES, HTTP_ERRORS } from '@/api/api-constants';
import { ServerCookieManager } from '@/utils/server-cookie-manager';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { theme } = await req.json();

  const init = {
    status: HTTP_CODES.OK,
    statusText: HTTP_ERRORS[HTTP_CODES.OK],
  };

  const res = new Response(null, init);

  ServerCookieManager.setCookie({
    res,
    value: theme,
  });

  return res;
}
