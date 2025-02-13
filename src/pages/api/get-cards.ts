import { HTTP_CODES, HTTP_ERRORS, RequestMethod } from '@/api/api-constants';
import { API_ROUTES } from '@/api/routes';
import { SpaceCraftsRequestPayload, SpacecraftsResponse } from '@/api/types';
import { requestHandler } from '@/api/utils';
import { CARDS_PER_PAGE } from '@/constants/view';
import { NextApiRequestWithQuery } from '@/types';
import { QueryObject } from '@/utils';
import type { NextApiResponse } from 'next';

interface Query {
  name: string;
  pageNumber: string;
}

export default async function handler(
  req: NextApiRequestWithQuery<Query>,
  res: NextApiResponse<SpacecraftsResponse | { message: string }>
) {
  if (req.method !== RequestMethod.GET) {
    return res
      .status(HTTP_CODES.NOT_ALLOWED)
      .json({ message: HTTP_ERRORS[HTTP_CODES.NOT_ALLOWED] });
  }

  const { name, pageNumber } = req.query;

  const payload: SpaceCraftsRequestPayload = {
    name,
    registry: '',
    status: '',
  };
  const query: QueryObject = { pageNumber, pageSize: CARDS_PER_PAGE };

  try {
    const data = await requestHandler<SpacecraftsResponse>({
      endpoint: API_ROUTES.CARDS,
      payload,
      query,
    });
    return res.status(HTTP_CODES.OK).send(data);
  } catch {
    return res
      .status(HTTP_CODES.BAD_REQUEST)
      .json({ message: HTTP_ERRORS[HTTP_CODES.BAD_REQUEST] });
  }
}
