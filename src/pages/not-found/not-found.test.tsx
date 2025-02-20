import NotFoundPage from './not-found';
import { renderWithReactRouter } from '../../api/mock/mocks/mock-react-router';
import { CLIENT_ROUTES } from '../../routes/routes.constant';

const renderSearchBox = renderWithReactRouter(NotFoundPage, CLIENT_ROUTES.HOME);
describe('NotFoundPage', () => {
  it('should render NotFoundPage', () => {
    const screen = renderSearchBox(CLIENT_ROUTES.HOME);

    const h1 = screen.getByRole('heading');

    expect(h1).toBeInTheDocument();
  });
});
