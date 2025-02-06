import { Header, HEADER_TEST_ID } from './header';
import { renderWithReactRouter } from '../../api/mock/mocks/mock-react-router';
import { CLIENT_ROUTES } from '../../routes/routes';

const renderSearchBox = renderWithReactRouter(Header, CLIENT_ROUTES.HOME);
describe('Header', () => {
  it('should render header', () => {
    const TEST_SEARCH_TERM = 'TEST';
    const screen = renderSearchBox(`/?name=${TEST_SEARCH_TERM}`);

    const header = screen.getByTestId(HEADER_TEST_ID);

    expect(header).toBeInTheDocument();
  });
});
