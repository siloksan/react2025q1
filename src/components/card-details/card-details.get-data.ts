import { requestHandler } from '../../api/utils/request-handler';
import { API_ROUTES } from '../../api/api-routes';
import { RequestMethod } from '../../api/api-constants';
import { SpacecraftResponse } from '../../api/types';

export async function getSpacecraft(uid: string) {
  const data = await requestHandler<SpacecraftResponse>(
    {
      endpoint: API_ROUTES.STAR_SHIP,
      query: { uid },
    },
    { method: RequestMethod.GET }
  );

  return data;
}
