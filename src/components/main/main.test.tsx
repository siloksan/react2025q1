import { render } from '@testing-library/react';
import { Mock } from 'vitest';
import { CardsBlock } from './components/cards-block/cards-block';
import { Pagination } from '../pagination/pagination';
import { LOADER_TEST_ID } from '../shared/loader/loader';
import { useAppDispatch, useAppSelector } from '@/store/store.hooks';
import { useRouter } from 'next/router';
import { SearchBox } from '../search-bar/search-box';
import { Flyout } from '../flyout/flyout';
import { Main } from './main';
import { BROWSER_ROUTES } from '@/api/routes';
import userEvent from '@testing-library/user-event';

vi.mock('../search-bar/search-box', () => ({
  SearchBox: vi.fn(),
}));

vi.mock('../../components/pagination/pagination', () => ({
  Pagination: vi.fn(),
}));

vi.mock('./components/cards-block/cards-block', () => ({
  CardsBlock: vi.fn(),
}));

vi.mock('../flyout/flyout', () => ({
  Flyout: vi.fn(),
}));

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/store/store.hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('Main component', () => {
  const push = vi.fn();
  const query = {};
  const router = { push, query };
  const dispatch = vi.fn();
  const PaginationMock = () => <div>Pagination</div>;
  const SearchBoxMock = () => <div>SearchBox</div>;
  const CardsBlockMock = () => <div>CardsBlock</div>;
  const FlyoutMock = () => <div>Flyout</div>;

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => vi.fn());

    (CardsBlock as Mock).mockImplementation(CardsBlockMock);
    (SearchBox as Mock).mockImplementation(SearchBoxMock);
    (Pagination as Mock).mockImplementation(PaginationMock);
    (Flyout as Mock).mockImplementation(FlyoutMock);

    (useRouter as Mock).mockReturnValue(router);
    (useAppSelector as unknown as Mock).mockReturnValue([]);
    (useAppDispatch as unknown as Mock).mockReturnValue(dispatch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the Main component with all elements', () => {
    const screen = render(<Main />);

    const heading = screen.getByRole('heading', { name: /Star ships/ });

    expect(heading).toBeInTheDocument();
  });

  it('renders the Loader when isLoading is true', () => {
    (useAppSelector as unknown as Mock).mockReturnValue({ isLoading: true });

    const screen = render(<Main />);

    const loader = screen.getByTestId(LOADER_TEST_ID);
    expect(loader).toBeInTheDocument();
  });

  it('renders the CardsBlock and Pagination when isLoading is false', () => {
    (useAppSelector as unknown as Mock).mockReturnValue({
      isLoading: false,
      value: { page: { pageNumber: 1, totalPages: 10 } },
    });

    const screen = render(<Main />);

    const cardsBlock = screen.getByText('CardsBlock');
    const pagination = screen.getByText('Pagination');

    expect(cardsBlock).toBeInTheDocument();
    expect(pagination).toBeInTheDocument();
  });

  it('calls closeDetails when clicking outside the details', async () => {
    const testId = 'testId';
    const screen = render(<Main testid={testId} />);

    await userEvent.click(screen.getByTestId(testId));

    expect(push).toHaveBeenCalledWith({
      pathname: `${BROWSER_ROUTES.CARDS}`,
      query,
    });
  });
});
