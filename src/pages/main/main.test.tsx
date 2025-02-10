import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../../context/theme.provider';
import { RouterProvider } from 'react-router';
import { routes } from '../../routes/routes';
import { ErrorButton } from './components/error-button/error-button';
import { SearchBox } from '../../components/search-bar/search-box';
import { Pagination } from '../../components/pagination/pagination';
import { CardsBlock } from './components/cards-block/cards-block';
import { Flyout } from '../../components/flyout/flyout';
import { Mock } from 'vitest';

vi.mock('./components/error-button/error-button', () => ({
  ErrorButton: vi.fn(),
}));
vi.mock('../../components/search-bar/search-box', () => ({
  SearchBox: vi.fn(),
}));
vi.mock('../../components/pagination/pagination', () => ({
  Pagination: vi.fn(),
}));
vi.mock('./components/cards-block/cards-block', () => ({
  CardsBlock: vi.fn(),
}));
vi.mock('../../components/flyout/flyout', () => ({
  Flyout: vi.fn(),
}));

describe('Main component', () => {
  const ErrorButtonMock = () => <div>ErrorButton</div>;
  const PaginationMock = () => <div>Pagination</div>;
  const SearchBoxMock = () => <div>SearchBox</div>;
  const CardsBlockMock = () => <div>CardsBlock</div>;
  const FlyoutMock = () => <div>Flyout</div>;

  beforeEach(() => {
    (CardsBlock as Mock).mockImplementation(CardsBlockMock);
    (ErrorButton as Mock).mockImplementation(ErrorButtonMock);
    (SearchBox as Mock).mockImplementation(SearchBoxMock);
    (Pagination as Mock).mockImplementation(PaginationMock);
    (Flyout as Mock).mockImplementation(FlyoutMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the Main component with all elements', () => {
    const screen = render(
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider router={routes} />
        </Provider>
      </ThemeProvider>
    );

    const heading = screen.getByRole('heading', { name: /Star ships/ });

    expect(heading).toBeInTheDocument();
  });
});
