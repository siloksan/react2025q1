import { render } from '@testing-library/react';
import { EMPTY_BUTTON_VIEW, Pagination } from './pagination';
import userEvent from '@testing-library/user-event';
import { type Mock } from 'vitest';
import { useQueryState } from '~/hooks/use-query-state';
import { QUERY_KEYS } from '~/constants';
import { PAGE_OFFSET } from '~/constants/view';

vi.mock('~/hooks/use-query-state', () => ({
  useQueryState: vi.fn(),
}));

describe('Pagination', () => {
  const setQueryValue = vi.fn();

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
    (useQueryState as unknown as Mock).mockReturnValue({ setQueryValue });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders null if totalPages is less than 2', () => {
    const props = { totalPages: 1, currentPage: 1 };
    const screen = render(<Pagination {...props} />);

    expect(screen.queryByTestId('pagination')).toBeNull();
  });

  it('renders pagination buttons correctly', () => {
    const props = { totalPages: 5, currentPage: 3 };

    const screen = render(<Pagination {...props} />);

    expect(screen.getByText('prev')).toBeInTheDocument();
    expect(screen.getByText('next')).toBeInTheDocument();
    expect(screen.getAllByTestId('pagination-button')).toHaveLength(5);
  });

  test('disables empty button value', () => {
    const props = { totalPages: 10, currentPage: 3 };

    const screen = render(<Pagination {...props} />);

    const emptyButton = screen.getByText(EMPTY_BUTTON_VIEW);
    expect(emptyButton).toBeDisabled();
  });

  it('disables prev button on first page', () => {
    const props = { totalPages: 10, currentPage: 1 };

    const screen = render(<Pagination {...props} />);

    expect(screen.getByText('prev')).toBeDisabled();
  });

  it('disables next button on last page', () => {
    const props = { totalPages: 5, currentPage: 5 };

    const screen = render(<Pagination {...props} />);

    expect(screen.getByText('next')).toBeDisabled();
  });

  it('disables current page button', () => {
    const props = { totalPages: 5, currentPage: 3 };

    const screen = render(<Pagination {...props} />);

    const currentPageButton = screen.getByText('3');
    expect(currentPageButton).toBeDisabled();
  });

  it('should change current page number', async () => {
    const pageNumber = 4;
    const newQueries = [{ key: QUERY_KEYS.PAGE, value: pageNumber.toString() }];

    const props = { totalPages: 5, currentPage: 3 };

    const screen = render(<Pagination {...props} />);

    const btn = screen.getByText(pageNumber);

    const user = userEvent.setup();
    await user.click(btn);

    expect(setQueryValue).toHaveBeenCalledWith(newQueries);
  });

  it('should change current page into previous when prev btn is clicked', async () => {
    const currenPage = 3;
    const props = { totalPages: 5, currentPage: currenPage };
    const newQueries = [
      { key: QUERY_KEYS.PAGE, value: (currenPage - PAGE_OFFSET).toString() },
    ];

    const screen = render(<Pagination {...props} />);

    const btn = screen.getByText('prev');

    const user = userEvent.setup();
    await user.click(btn);

    expect(setQueryValue).toHaveBeenCalledWith(newQueries);
  });

  it('should change current page into next when next btn is clicked', async () => {
    const currenPage = 3;
    const props = { totalPages: 5, currentPage: currenPage };
    const newQueries = [
      { key: QUERY_KEYS.PAGE, value: (currenPage + PAGE_OFFSET).toString() },
    ];

    const screen = render(<Pagination {...props} />);
    const btn = screen.getByText('next');

    const user = userEvent.setup();
    await user.click(btn);

    expect(setQueryValue).toHaveBeenCalledWith(newQueries);
  });
});
