import { Card } from './card';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { type Mock } from 'vitest';
import { DUMMY_SPACECRAFT_DETAILS_RESPONSE } from '~/service/mock/mocks/dummyData/dummySpaceCraftDetailsResponse';
import type { Spacecraft } from '~/service/types';
import { useAppDispatch, useAppSelector } from '~/store/store.hooks';
import { useQueryState } from '~/hooks/use-query-state';
import { BROWSER_ROUTES } from '~/service/routes';
import { removeCard, selectCard } from '~/store/features';

vi.mock('~/hooks/use-query-state', () => ({
  useQueryState: vi.fn(),
}));

vi.mock('~/store/store.hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('Card', () => {
  const CARD_TESTID = 'card_testid';
  const cardInfo =
    DUMMY_SPACECRAFT_DETAILS_RESPONSE.spacecraft as unknown as Spacecraft;
  const dispatch = vi.fn();
  const redirectWithQuery = vi.fn();
  const params = DUMMY_SPACECRAFT_DETAILS_RESPONSE.spacecraft.uid;

  beforeEach(() => {
    (useAppDispatch as unknown as Mock).mockReturnValue(dispatch);
    (useAppSelector as unknown as Mock).mockReturnValue([]);
    (useQueryState as Mock).mockReturnValue({ redirectWithQuery, params });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render li', () => {
    render(<Card cardInfo={cardInfo} testid={CARD_TESTID} />);
    const listitem = screen.getByRole('listitem');
    expect(listitem).toBeInTheDocument();
  });

  it('should navigate to details on click', async () => {
    render(<Card cardInfo={cardInfo} testid={CARD_TESTID} />);
    const listitem = screen.getByRole('listitem');
    await userEvent.click(listitem);
    expect(redirectWithQuery).toHaveBeenCalledWith(
      `${BROWSER_ROUTES.CARD_DETAILS(cardInfo.uid)}`
    );
  });

  it('should dispatch selectCard on checkbox check', async () => {
    render(<Card cardInfo={cardInfo} testid={CARD_TESTID} />);
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(dispatch).toHaveBeenCalledWith(selectCard(cardInfo));
  });

  it('should dispatch removeCard on checkbox uncheck', async () => {
    (useAppSelector as unknown as Mock).mockReturnValue([cardInfo]);
    render(<Card cardInfo={cardInfo} />);
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(dispatch).toHaveBeenCalledWith(removeCard(cardInfo.uid));
  });

  it('should open card-details on closeDetails', async () => {
    render(<Card cardInfo={cardInfo} testid={CARD_TESTID} />);

    const listitem = screen.getByRole('listitem');
    await userEvent.click(listitem);

    expect(redirectWithQuery).toHaveBeenCalledWith(
      `${BROWSER_ROUTES.CARD_DETAILS(cardInfo.uid)}`
    );
  });
});
