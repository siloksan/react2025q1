import { useRouter } from 'next/router';
import { Spacecraft } from '../../api/types';
import { useAppDispatch, useAppSelector } from '@/store/store.hooks';
import { setDetailsLoading } from '@/store/features';
import { Card } from './card';
import { DUMMY_SPACECRAFT_DETAILS_RESPONSE } from '../../api/mock/mocks/dummyData/dummySpaceCraftDetailsResponse';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { BROWSER_ROUTES } from '@/api/routes';
import { Mock } from 'vitest';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/store/store.hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('Card', () => {
  const cardInfo =
    DUMMY_SPACECRAFT_DETAILS_RESPONSE.spacecraft as unknown as Spacecraft;
  const push = vi.fn();
  const query = {};
  const router = { push, query };
  const dispatch = vi.fn();

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
    (useRouter as Mock).mockReturnValue(router);
    (useAppSelector as unknown as Mock).mockReturnValue([]);
    (useAppDispatch as unknown as Mock).mockReturnValue(dispatch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render li', () => {
    const screen = render(<Card cardInfo={cardInfo} />);

    const listitem = screen.getByRole('listitem');

    expect(listitem).toBeInTheDocument();
  });

  it('should navigate to details on click', async () => {
    const screen = render(<Card cardInfo={cardInfo} />);
    const listitem = screen.getByRole('listitem');

    await userEvent.click(listitem);

    expect(dispatch).toHaveBeenCalledWith(setDetailsLoading(true));
    expect(push).toHaveBeenCalledWith({
      pathname: `${BROWSER_ROUTES.CARD_DETAILS(cardInfo.uid)}`,
      query: {},
    });
  });

  it('should dispatch selectCard on checkbox check', async () => {
    const screen = render(<Card cardInfo={cardInfo} />);

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    expect(dispatch).toHaveBeenCalledOnce();
  });

  it('should dispatch removeCard on checkbox uncheck', async () => {
    const screen = render(<Card cardInfo={cardInfo} />);

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    expect(dispatch).toHaveBeenCalledOnce();
  });

  it('should navigate to cards on closeDetails', async () => {
    const query = { spacecraftId: cardInfo.uid };
    const router = { push, query };
    (useRouter as Mock).mockReturnValue(router);

    const screen = render(<Card cardInfo={cardInfo} />);
    const listitem = screen.getByRole('listitem');

    await userEvent.click(listitem);

    expect(push).toHaveBeenCalledWith({
      pathname: `${BROWSER_ROUTES.CARDS}`,
      query: {},
    });
  });
});
