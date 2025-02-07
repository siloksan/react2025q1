import { Mock } from 'vitest';
import { getSpacecrafts } from './cards-list.get-data';
import { requestHandler } from '../../api/utils/request-handler';
import { API_ROUTES } from '../../api/api-routes';
import { CARDS_PER_PAGE } from './cards-list.constants';

vi.mock('../../api/utils/request-handler');

describe('getSpacecrafts', () => {
  it('should call requestHandler with correct parameters', async () => {
    const params = { name: 'Apollo', pageNumber: 1 };
    const expectedPayload = {
      name: 'Apollo',
      registry: '',
      status: '',
    };
    const expectedQuery = { pageNumber: 1, pageSize: CARDS_PER_PAGE };

    await getSpacecrafts(params);

    expect(requestHandler).toHaveBeenCalledWith({
      endpoint: API_ROUTES.STAR_SHIPS,
      payload: expectedPayload,
      query: expectedQuery,
    });
  });

  it('should return data from requestHandler', async () => {
    const mockData = { data: 'mockData' };
    (requestHandler as Mock).mockResolvedValue(mockData);

    const params = { name: 'Apollo', pageNumber: 1 };
    const data = await getSpacecrafts(params);

    expect(data).toEqual(mockData);
  });

  it('should handle empty name parameter', async () => {
    const params = { name: '', pageNumber: 1 };
    const expectedPayload = {
      name: '',
      registry: '',
      status: '',
    };
    const expectedQuery = { pageNumber: 1, pageSize: CARDS_PER_PAGE };

    await getSpacecrafts(params);

    expect(requestHandler).toHaveBeenCalledWith({
      endpoint: API_ROUTES.STAR_SHIPS,
      payload: expectedPayload,
      query: expectedQuery,
    });
  });

  it('should handle pageNumber parameter', async () => {
    const params = { name: 'Apollo', pageNumber: 2 };
    const expectedPayload = {
      name: 'Apollo',
      registry: '',
      status: '',
    };
    const expectedQuery = { pageNumber: 2, pageSize: CARDS_PER_PAGE };

    await getSpacecrafts(params);

    expect(requestHandler).toHaveBeenCalledWith({
      endpoint: API_ROUTES.STAR_SHIPS,
      payload: expectedPayload,
      query: expectedQuery,
    });
  });
});
