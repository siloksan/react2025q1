import { render } from '@testing-library/react';
import CardsDetailsWrapper, { loader } from './page';
import { DUMMY_SPACECRAFT_DETAILS_RESPONSE } from '~/service/mock/mocks/dummyData/dummySpaceCraftDetailsResponse';
import { getSpacecraft } from '~/service/handlers';
import type { Mock } from 'vitest';

vi.mock('~/components/card-details/card-details', () => ({
  CardDetails: () => <div>Mocked CardDetails</div>,
}));

describe('CardsDetailsWrapper', () => {
  const mockLoaderData = {
    spacecraftResponse: DUMMY_SPACECRAFT_DETAILS_RESPONSE,
  };

  it('renders CardDetails with the correct spacecraft data', () => {
    const { getByText } = render(
      <CardsDetailsWrapper loaderData={mockLoaderData} />
    );

    expect(getByText('Mocked CardDetails')).toBeInTheDocument();
  });
});
vi.mock('~/service/handlers', () => ({
  getSpacecraft: vi.fn(),
}));

describe('loader', () => {
  it('fetches spacecraft data and returns it', async () => {
    const mockParams = {
      params: {
        spacecraftId: DUMMY_SPACECRAFT_DETAILS_RESPONSE.spacecraft.uid,
      },
    };
    (getSpacecraft as Mock).mockResolvedValue(
      DUMMY_SPACECRAFT_DETAILS_RESPONSE
    );

    await loader(mockParams);

    expect(getSpacecraft).toHaveBeenCalledWith(
      DUMMY_SPACECRAFT_DETAILS_RESPONSE.spacecraft.uid
    );
  });
});
