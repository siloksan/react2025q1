import { RequestMethod } from '../api-constants';
import { API_ROUTES } from '../routes';
import type { SpacecraftResponse } from '../types';
import { requestHandler } from '../utils';

export async function getSpacecraft(spacecraftId: string) {
  return await requestHandler<SpacecraftResponse>(
    {
      endpoint: API_ROUTES.STAR_SHIP,
      query: { uid: spacecraftId },
    },
    { method: RequestMethod.GET }
  );
}
