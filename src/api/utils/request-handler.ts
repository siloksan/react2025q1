import { API_HEADER, RequestMethod } from '../api-constants';
import { ApiRoutes, BASE_URL } from '../routes';
import { isNullable } from '../../utils';
import {
  createQueryString,
  QueryObject,
} from '../../utils/create-query-string';
import { Payload } from '../types';

export function handleBody(data: Payload | undefined) {
  return isNullable(data) ? undefined : createQueryString(data);
}

interface RequestParams {
  endpoint: ApiRoutes;
  payload?: Payload;
  query?: QueryObject;
}

export interface FetchOptions extends RequestInit {
  method?: RequestMethod;
  headers?: HeadersInit;
}

/**
 * Handles HTTP requests to a specified endpoint with given parameters and options.
 *
 * @template T - The expected response type.
 * @param {RequestParams} params - The parameters for the request.
 * @param {FetchOptions} [options={}] - Optional fetch options such as method and headers.
 * @returns {Promise<T>} - A promise that resolves to the response data of type T.
 * @throws {Error} - Throws an error if the response status is not ok.
 */
export async function requestHandler<T>(
  params: RequestParams,
  options: FetchOptions = {}
): Promise<T> {
  const { endpoint, payload, query } = params;
  const { method = RequestMethod.POST, headers = API_HEADER } = options;

  let fetchURL = `${BASE_URL}${endpoint}`;

  if (query) {
    fetchURL += `?${createQueryString(query)}`;
  }

  const response = await fetch(fetchURL, {
    method,
    body: handleBody(payload),
    headers,
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data: ${fetchURL} (${response.statusText})`
    );
  }

  const data = await response.json();

  return data;
}
