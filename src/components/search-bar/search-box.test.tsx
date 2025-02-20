import { SEARCH_PLACEHOLDER, SearchBox } from './search-box';
import { renderWithReactRouter } from '../../api/mock/mocks/mock-react-router';
import { Mock } from 'vitest';
import { useQueryState } from '../../hooks/use-query-state';
import { QUERY_KEYS } from '../../constants';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/dom';
import { CLIENT_ROUTES } from '../../routes/routes.constant';

vi.mock('../../hooks/use-query-state', () => ({
  useQueryState: vi.fn(),
}));

const renderSearchBox = renderWithReactRouter(SearchBox, CLIENT_ROUTES.HOME);
describe('SearchBox', () => {
  const queryValue = 'test';
  const queryKey = QUERY_KEYS.NAME;
  const setQueryValueMock = vi.fn();

  beforeEach(() => {
    (useQueryState as Mock).mockReturnValue({
      searchParams: new URLSearchParams(`${queryKey}=${queryValue}`),
      setQueryValue: setQueryValueMock,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  it('should render search input with valid value', () => {
    const screen = renderSearchBox(CLIENT_ROUTES.HOME);

    const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);

    expect(input).toHaveValue(queryValue);
  });

  it('should update input value on change', () => {
    const screen = renderSearchBox(CLIENT_ROUTES.HOME);
    const value = 'test';

    const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);

    userEvent.type(input, value);

    expect(input).toHaveValue(value);
  });

  it('should call handleSubmit on Enter key press', async () => {
    const screen = renderSearchBox(CLIENT_ROUTES.HOME);
    const value = 'test';

    const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);
    await userEvent.type(input, value);
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(setQueryValueMock).toHaveBeenCalledOnce();
  });

  it('should call handleSubmit on button click', async () => {
    const screen = renderSearchBox(CLIENT_ROUTES.HOME);
    const value = 'test';

    const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);
    const btn = screen.getByRole('button');
    await userEvent.type(input, value);
    await userEvent.click(btn);

    expect(setQueryValueMock).toHaveBeenCalledOnce();
  });
});
