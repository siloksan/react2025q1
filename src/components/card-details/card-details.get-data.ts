import { SpacecraftsResponse } from '../../api/types';
import { requestHandler } from '../../api/utils/request-handler';
import { API_ROUTES } from '../../api/api-routes';
import { RequestMethod } from '../../api/api-constants';

export async function getSpacecraft(uid: string) {
  const data = await requestHandler<SpacecraftsResponse>(
    {
      endpoint: API_ROUTES.STAR_SHIP,
      query: { uid },
    },
    { method: RequestMethod.GET }
  );

  return data;
}
