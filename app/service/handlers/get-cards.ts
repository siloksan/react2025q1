import { CARDS_PER_PAGE, PAGE_OFFSET } from '~/constants/view';
import type { SpaceCraftsRequestPayload, SpacecraftsResponse } from '../types';
import type { QueryObject } from '~/utils';
import { requestHandler } from '../utils';
import { API_ROUTES } from '../routes';

interface Args {
  name: string;
  page: number;
}

export async function getCards({ name, page }: Args) {
  const payload: SpaceCraftsRequestPayload = {
    name,
    registry: '',
    status: '',
  };
  const pageNumber = page - PAGE_OFFSET;
  const query: QueryObject = { pageNumber, pageSize: CARDS_PER_PAGE };

  return await requestHandler<SpacecraftsResponse>({
    endpoint: API_ROUTES.CARDS,
    payload,
    query,
  });
}
