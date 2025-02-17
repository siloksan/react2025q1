import { HTTP_CODES, HTTP_ERRORS, RequestMethod } from '@/api/api-constants';
import { API_ROUTES } from '@/api/routes';
import { SpacecraftResponse } from '@/api/types';
import { requestHandler } from '@/api/utils';
import { SpacecraftParams } from '@/pages';
import { NextApiRequestWithQuery } from '@/types';
import type { NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequestWithQuery<SpacecraftParams>,
  res: NextApiResponse
) {
  if (req.method !== RequestMethod.GET) {
    return res
      .status(HTTP_CODES.NOT_ALLOWED)
      .json({ message: HTTP_ERRORS[HTTP_CODES.NOT_ALLOWED] });
  }

  const { spacecraftId } = req.query;

  if (!spacecraftId) {
    return res
      .status(HTTP_CODES.BAD_REQUEST)
      .json({ message: HTTP_ERRORS[HTTP_CODES.BAD_REQUEST] });
  }

  try {
    const data = await requestHandler<SpacecraftResponse>(
      {
        endpoint: API_ROUTES.STAR_SHIP,
        query: { uid: spacecraftId },
      },
      { method: RequestMethod.GET }
    );

    return res.status(HTTP_CODES.OK).send(data);
  } catch {
    return res
      .status(HTTP_CODES.BAD_REQUEST)
      .json({ message: HTTP_ERRORS[HTTP_CODES.BAD_REQUEST] });
  }
}
