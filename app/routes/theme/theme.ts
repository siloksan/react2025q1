import type { Route } from '../../+types/root';
import { HTTP_CODES } from '~/service/api-constants';
import { COOKIE_KEYS } from '~/constants/cookie';
import { cookieTheme, MAX_AGE } from '~/utils';

export async function action({ request }: Route.ActionArgs) {
  const bodyParams = await request.formData();

  return new Response(null, {
    status: HTTP_CODES.OK,
    headers: {
      'Set-Cookie': await cookieTheme.serialize({
        theme: bodyParams.get(COOKIE_KEYS.THEME),
        expires: new Date(Date.now() + MAX_AGE),
      }),
    },
  });
}
