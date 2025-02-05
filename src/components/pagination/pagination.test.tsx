import { screen } from '@testing-library/react';
import { EMPTY_BUTTON_VIEW, Pagination } from './pagination';
import { renderWithReactRouter } from '../../api/mock/mocks/mock-react-router';
import { CLIENT_ROUTES } from '../../routes/routes';
import { useQueryState } from '../../hooks/use-query-state';
import userEvent from '@testing-library/user-event';
import { QUERY_KEYS } from '../../constants';
import { PAGE_OFFSET } from '../cards-list/cards-list.constants';

const initialRoute = `/`;

vi.mock('../../hooks/use-query-state', () => {
  const setQueryValue = vi.fn();
  return {
    useQueryState: vi.fn().mockReturnValue({ setQueryValue }),
  };
});

describe('Pagination', () => {
  it('renders null if totalPages is less than 2', () => {
    const renderPagination = renderWithReactRouter(
      Pagination,
      CLIENT_ROUTES.HOME,
      { totalPages: 1, currentPage: 1 }
    );

    renderPagination(initialRoute);

    expect(screen.queryByTestId('pagination')).toBeNull();
  });

  it('renders pagination buttons correctly', () => {
    const renderPagination = renderWithReactRouter(
      Pagination,
      CLIENT_ROUTES.HOME,
      { totalPages: 5, currentPage: 3 }
    );

    renderPagination(initialRoute);

    expect(screen.getByText('prev')).toBeInTheDocument();
    expect(screen.getByText('next')).toBeInTheDocument();
    expect(screen.getAllByTestId('pagination-button')).toHaveLength(5);
  });

  test('disables empty button value', () => {
    const renderPagination = renderWithReactRouter(
      Pagination,
      CLIENT_ROUTES.HOME,
      { totalPages: 10, currentPage: 3 }
    );

    renderPagination(initialRoute);

    const emptyButton = screen.getByText(EMPTY_BUTTON_VIEW);
    expect(emptyButton).toBeDisabled();
  });

  it('disables prev button on first page', () => {
    const renderPagination = renderWithReactRouter(
      Pagination,
      CLIENT_ROUTES.HOME,
      { totalPages: 10, currentPage: 1 }
    );

    renderPagination(initialRoute);

    expect(screen.getByText('prev')).toBeDisabled();
  });
  it('disables next button on last page', () => {
    const renderPagination = renderWithReactRouter(
      Pagination,
      CLIENT_ROUTES.HOME,
      { totalPages: 5, currentPage: 5 }
    );

    renderPagination(initialRoute);

    expect(screen.getByText('next')).toBeDisabled();
  });

  it('disables current page button', () => {
    const renderPagination = renderWithReactRouter(
      Pagination,
      CLIENT_ROUTES.HOME,
      { totalPages: 5, currentPage: 3 }
    );

    renderPagination(initialRoute);
    const currentPageButton = screen.getByText('3');
    expect(currentPageButton).toBeDisabled();
  });

  it('should change current page number', async () => {
    const { setQueryValue } = useQueryState();
    const pageNumber = '4';
    const newQueries = [{ key: QUERY_KEYS.PAGE, value: pageNumber }];

    const renderPagination = renderWithReactRouter(
      Pagination,
      CLIENT_ROUTES.HOME,
      { totalPages: 5, currentPage: 3 }
    );

    renderPagination(initialRoute);

    const btn = screen.getByText(pageNumber);

    const user = userEvent.setup();
    await user.click(btn);

    expect(setQueryValue).toHaveBeenCalledWith(newQueries);
  });

  it('should change current page into previous when prev btn is clicked', async () => {
    const { setQueryValue } = useQueryState();
    const currenPage = 3;
    const newQueries = [
      { key: QUERY_KEYS.PAGE, value: (currenPage - PAGE_OFFSET).toString() },
    ];

    const renderPagination = renderWithReactRouter(
      Pagination,
      CLIENT_ROUTES.HOME,
      { totalPages: 5, currentPage: currenPage }
    );

    renderPagination(initialRoute);

    const btn = screen.getByText('prev');

    const user = userEvent.setup();
    await user.click(btn);

    expect(setQueryValue).toHaveBeenCalledWith(newQueries);
  });

  it('should change current page into next when next btn is clicked', async () => {
    const { setQueryValue } = useQueryState();
    const currenPage = 3;
    const newQueries = [
      { key: QUERY_KEYS.PAGE, value: (currenPage + PAGE_OFFSET).toString() },
    ];

    const renderPagination = renderWithReactRouter(
      Pagination,
      CLIENT_ROUTES.HOME,
      { totalPages: 5, currentPage: currenPage }
    );

    renderPagination(initialRoute);

    const btn = screen.getByText('next');

    const user = userEvent.setup();
    await user.click(btn);

    expect(setQueryValue).toHaveBeenCalledWith(newQueries);
  });
});
