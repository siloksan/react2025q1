import { Mock } from 'vitest';
import { getSpacecraft } from './card-details.get-data';
import { requestHandler } from '../../api/utils/request-handler';
import { API_ROUTES } from '../../api/api-routes';
import { RequestMethod } from '../../api/api-constants';
import { DUMMY_SPACECRAFT_DETAILS_RESPONSE } from '../../api/mock/mocks/dummyData/dummySpaceCraftDetailsResponse';

vi.mock('../../api/utils/request-handler');

describe('getSpacecraft', () => {
  it('should fetch spacecraft data successfully', async () => {
    const mockResponse = DUMMY_SPACECRAFT_DETAILS_RESPONSE;
    (requestHandler as Mock).mockResolvedValue(mockResponse);

    const uid = '123';
    const data = await getSpacecraft(uid);

    expect(requestHandler).toHaveBeenCalledWith(
      {
        endpoint: API_ROUTES.STAR_SHIP,
        query: { uid },
      },
      { method: RequestMethod.GET }
    );
    expect(data).toEqual(mockResponse);
  });

  it('should handle errors', async () => {
    const mockError = new Error('Network error');
    (requestHandler as Mock).mockRejectedValue(mockError);

    const uid = '123';

    await expect(getSpacecraft(uid)).rejects.toThrow('Network error');
  });
});
