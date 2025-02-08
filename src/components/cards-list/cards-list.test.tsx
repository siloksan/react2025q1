import { render, screen } from '@testing-library/react';
import { Mock } from 'vitest';
import { CardsList } from './cards-list';
import { useQueryState } from '../../hooks/use-query-state';
import { getSpacecrafts } from './cards-list.get-data';
import { DUMMY_SPACECRAFTS_RESPONSE } from '../../api/mock/mocks/dummyData/dummySpaceCraftsResponse';
import { LOADER_TEST_ID } from '../shared/loader/loader';

vi.mock('../../hooks/use-query-state', () => ({
  useQueryState: vi.fn(),
}));

vi.mock('./cards-list.get-data', () => ({
  getSpacecrafts: vi.fn(),
}));

describe('CardsList', () => {
  const setData = vi.fn();
  const mockResponse = DUMMY_SPACECRAFTS_RESPONSE;
  beforeEach(() => {
    (useQueryState as Mock).mockReturnValue({
      searchParams: new URLSearchParams(),
    });
    (getSpacecrafts as Mock).mockResolvedValue(mockResponse);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders loader while loading', async () => {
    render(<CardsList data={null} setData={setData} />);

    expect(screen.getByTestId(LOADER_TEST_ID)).toBeInTheDocument();
  });
});
