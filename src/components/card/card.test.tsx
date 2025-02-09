import { Card } from './card';
import { DUMMY_SPACECRAFT_DETAILS_RESPONSE } from '../../api/mock/mocks/dummyData/dummySpaceCraftDetailsResponse';
import { Spacecraft } from '../../api/types';
import userEvent from '@testing-library/user-event';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { render } from '@testing-library/react';
import { Mock } from 'vitest';
import { useQueryState } from '../../hooks/use-query-state';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock('../../hooks/use-query-state', () => ({
  useQueryState: vi.fn(),
}));

describe('Card', () => {
  const cardInfo =
    DUMMY_SPACECRAFT_DETAILS_RESPONSE.spacecraft as unknown as Spacecraft;
  const navigate = vi.fn();
  const dispatch = vi.fn();
  const params = {
    spacecraftId: cardInfo.uid,
  };

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
    (useNavigate as Mock).mockReturnValue(navigate);
    (useParams as Mock).mockReturnValue(params);
    (useSelector as unknown as Mock).mockReturnValue([]);
    (useDispatch as unknown as Mock).mockReturnValue(dispatch);
    (useQueryState as Mock).mockReturnValue({
      searchParams: new URLSearchParams(),
    });
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

    expect(navigate).toHaveBeenCalledOnce();
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
});
