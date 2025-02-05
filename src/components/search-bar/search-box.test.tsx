import { screen } from '@testing-library/react';
import { SEARCH_PLACEHOLDER, SearchBox } from './search-box';
import { CLIENT_ROUTES } from '../../routes/routes';
import { renderWithReactRouter } from '../../api/mock/mocks/mock-react-router';

const renderSearchBox = renderWithReactRouter(SearchBox, CLIENT_ROUTES.HOME);
describe('SearchBox', () => {
  it('should render search input with valid value', () => {
    const TEST_SEARCH_TERM = 'TEST';
    renderSearchBox(`/?name=${TEST_SEARCH_TERM}`);

    const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);

    expect(input).toHaveValue(TEST_SEARCH_TERM);
  });
});
