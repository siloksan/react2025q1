import {
  SpaceCraftsRequestPayload,
  SpacecraftsResponse,
} from '../../api/types';
import { requestHandler } from '../../api/utils/request-handler';
import { API_ROUTES } from '../../api/api-routes';
import { CARDS_PER_PAGE } from './cards-list.constants';
import { QueryObject } from '../../utils/createQueryString';

interface RequestParams {
  name: string;
  pageNumber: number;
}

/**
 * Makes a request to the API to fetch spacecrafts.
 *
 * @param {{name: string, pageNumber: number}} params
 * @param {string} [params.name=''] The name of the spacecraft to search for.
 * @param {number} [params.pageNumber=0] The page number to fetch.
 * @returns {Promise<object>} The response data.
 */
export async function getSpacecrafts(params: RequestParams) {
  const { name, pageNumber } = params;

  const payload: SpaceCraftsRequestPayload = {
    name,
    registry: '',
    status: '',
  };
  const query: QueryObject = { pageNumber, pageSize: CARDS_PER_PAGE };

  const data = await requestHandler<SpacecraftsResponse>({
    endpoint: API_ROUTES.STAR_SHIPS,
    payload,
    query,
  });

  return data;
}
