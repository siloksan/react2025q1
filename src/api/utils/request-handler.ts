import { createQueryString, QueryObject } from '../../utils/createQueryString';

const BASE_URL = 'https://stapi.co/api/v2/rest/';

/**
 * Makes a POST request to the specified endpoint using the provided payload and query parameters.
 *
 * @param endpoint The endpoint to make the request to.
 * @param payload The payload to send in the request body.
 * @param query The query parameters to send in the URL.
 * @returns The response data if the request was successful, otherwise `undefined`.
 */
export async function requestHandler<T>(
  endpoint: string,
  payload: QueryObject,
  query: QueryObject
): Promise<T> {
  const newPayload = {
    name: payload.name,
    registry: '',
    status: '',
  };

  const response = await fetch(
    `${BASE_URL}${endpoint}?${createQueryString(query)}`,
    {
      method: 'POST',
      body: createQueryString(newPayload),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
