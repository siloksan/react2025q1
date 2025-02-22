import { DUMMY_SPACECRAFTS_RESPONSE } from '@/api/mock/mocks/dummyData/dummySpaceCraftsResponse';
import { Card } from '../card/card';
import { Mock } from 'vitest';
import { CardsList } from './cards-list';
import { render } from '@testing-library/react';
import { SpacecraftsResponse } from '@/api/types';

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
    (Card as Mock).mockImplementation(CardMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders "No spacecrafts found" when data is empty', async () => {
    const data = {
      spacecrafts: [],
      page: { totalElements: 0 },
    } as unknown as SpacecraftsResponse;

    const screen = render(<CardsList cards={data} />);
    expect(screen.getByText('No spacecrafts found')).toBeInTheDocument();
  });

  it('renders list of cards when data is available', async () => {
    const screen = render(<CardsList cards={data} />);

    data.spacecrafts.forEach((card) => {
      expect(
        screen.getByRole('heading', { name: card.uid })
      ).toBeInTheDocument();
    });
  });
});
