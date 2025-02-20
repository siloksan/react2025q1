import { render } from '@testing-library/react';
import { Mock } from 'vitest';
import { CardsList } from './cards-list';
import { useQueryState } from '../../hooks/use-query-state';
import { DUMMY_SPACECRAFTS_RESPONSE } from '../../api/mock/mocks/dummyData/dummySpaceCraftsResponse';
import { LOADER_TEST_ID } from '../shared/loader/loader';
import { useDispatch } from 'react-redux';
import { useGetCardsQuery } from '../../api/api-root';
import { Card } from '../card/card';

vi.mock('../../api/api-root', () => ({
  useGetCardsQuery: vi.fn(),
}));

vi.mock('../card/card', () => ({
  Card: vi.fn(),
}));

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../../hooks/use-query-state', () => ({
  useQueryState: vi.fn(),
}));

describe('CardsList', () => {
  const data = DUMMY_SPACECRAFTS_RESPONSE;
  const errorMsg = 'Test Error';
  const error = new Error(errorMsg);
  const isFetching = false;
  const isError = false;
  const dispatch = vi.fn();

  const CardMock = ({ cardInfo }: { cardInfo: { uid: string } }) => (
    <h1>{cardInfo.uid}</h1>
  );

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
    (Card as Mock).mockImplementation(CardMock);
    (useQueryState as Mock).mockReturnValue({
      searchParams: new URLSearchParams(),
    });
    (useDispatch as unknown as Mock).mockReturnValue(dispatch);
    (useGetCardsQuery as Mock).mockReturnValue({
      data,
      isFetching,
      isError,
      error,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders loader while loading', async () => {
    (useGetCardsQuery as Mock).mockReturnValueOnce({
      data: null,
      isFetching: true,
      isError: false,
      error: null,
    });

    const screen = render(<CardsList />);
    expect(screen.getByTestId(LOADER_TEST_ID)).toBeInTheDocument();
  });

  it('renders "No spacecrafts found" when data is empty', async () => {
    (useGetCardsQuery as Mock).mockReturnValueOnce({
      data: { spacecrafts: [] },
      isFetching: false,
      isError: false,
      error: null,
    });

    const screen = render(<CardsList />);
    expect(screen.getByText('No spacecrafts found')).toBeInTheDocument();
  });

  it('renders list of cards when data is available', async () => {
    const screen = render(<CardsList />);

    data.spacecrafts.forEach((card) => {
      expect(
        screen.getByRole('heading', { name: card.uid })
      ).toBeInTheDocument();
    });
  });

  it('renders error message when there is an error', async () => {
    (useGetCardsQuery as Mock).mockReturnValue({
      data: null,
      isFetching: false,
      isError: true,
      error,
    });

    expect(() => render(<CardsList />)).toThrowError(error);
  });
});
