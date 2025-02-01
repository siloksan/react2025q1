import { SpacecraftsResponse } from '../../api/types';
import { requestHandler } from '../../api/utils/request-handler';
import { CARDS_PER_PAGE } from './cards-list.constants';

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

  const payload = { name };
  const query = { pageNumber, pageSize: CARDS_PER_PAGE };

  const data = await requestHandler<SpacecraftsResponse>(
    'spacecraft/search',
    payload,
    query
  );

  return data;
}
