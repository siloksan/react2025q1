import { Card } from './card';
import { CLIENT_ROUTES } from '../../routes/routes';
import { renderWithReactRouter } from '../../api/mock/mocks/mock-react-router';
import { DUMMY_SPACECRAFT_DETAILS_RESPONSE } from '../../api/mock/mocks/dummyData/dummySpaceCraftDetailsResponse';
import { Spacecraft } from '../../api/types';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router';

const cardInfo: Spacecraft =
  DUMMY_SPACECRAFT_DETAILS_RESPONSE.spacecraft as unknown as Spacecraft;

const renderCard = renderWithReactRouter(Card, CLIENT_ROUTES.HOME, {
  cardInfo,
});

vi.mock(import('react-router'), async (importOriginal) => {
  const actual = await importOriginal();
  const navigate = vi.fn();
  const params = { spacecraftId: '1' };
  return {
    ...actual,
    useNavigate: vi.fn().mockReturnValue(navigate),
    useParams: vi.fn().mockReturnValue(params),
  };
});

describe('Card', () => {
  it('should render li', () => {
    const screen = renderCard(CLIENT_ROUTES.HOME);

    const listitem = screen.getByRole('listitem');

    expect(listitem).toBeInTheDocument();
  });

  it('should open card details when card is clicked', async () => {
    const navigate = useNavigate();
    const screen = renderCard(CLIENT_ROUTES.HOME);

    const listitem = screen.getByRole('listitem');
    const user = userEvent.setup();
    await user.click(listitem);

    expect(navigate).toHaveBeenCalledOnce();
  });
});
