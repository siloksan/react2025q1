import { DUMMY_SPACECRAFTS_RESPONSE } from '@/api/mock/mocks/dummyData/dummySpaceCraftsResponse';
import { Card } from '../card/card';
import { useAppSelector } from '@/store/store.hooks';
import { Mock } from 'vitest';
import { CardsList } from './cards-list';
import { render } from '@testing-library/react';

vi.mock('@/store/store.hooks', () => ({
  useAppSelector: vi.fn(),
}));

vi.mock('../card/card', () => ({
  Card: vi.fn(),
}));

describe('CardsList', () => {
  const data = DUMMY_SPACECRAFTS_RESPONSE;
  const CardMock = ({ cardInfo }: { cardInfo: { uid: string } }) => (
    <h1>{cardInfo.uid}</h1>
  );
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
    (useAppSelector as unknown as Mock).mockReturnValue(data);
    (Card as Mock).mockImplementation(CardMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders "No spacecrafts found" when data is empty', async () => {
    (useAppSelector as unknown as Mock).mockReturnValue(null);

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
});
