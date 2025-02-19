import { SEARCH_PLACEHOLDER, SearchBox } from './search-box';
import { Mock } from 'vitest';
import { useQueryState } from '@/hooks/use-query-state';
import { QUERY_KEYS } from '../../constants';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/dom';
import { useAppDispatch } from '@/store/store.hooks';
import { render } from '@testing-library/react';

// import { ChangeEvent, ComponentProps, KeyboardEvent, useState } from 'react';
// import loupe from './assets/search-icon.svg';
// import { useQueryState } from '../../hooks/use-query-state';
// import { QUERY_KEYS } from '../../constants/query-keys';
// import { FIRST_PAGE, PAGE_OFFSET } from '../cards-list/cards-list.constants';
// import Image from 'next/image';
// import { setLoading } from '@/store/features';
// import { useAppDispatch } from '@/store/store.hooks';

vi.mock('@/hooks/use-query-state', () => ({
  useQueryState: vi.fn(),
}));

vi.mock('@/store/store.hooks', () => ({
  useAppDispatch: vi.fn(),
}));

// const renderSearchBox = renderWithReactRouter(SearchBox, CLIENT_ROUTES.HOME);
describe('SearchBox', () => {
  const dispatch = vi.fn();
  const queryValue = 'test';
  const searchParams = { [QUERY_KEYS.NAME]: queryValue };
  const setQueryValue = vi.fn();

  beforeEach(() => {
    (useAppDispatch as unknown as Mock).mockReturnValue(dispatch);
    (useQueryState as unknown as Mock).mockReturnValue({
      setQueryValue,
      searchParams,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  it('should render search input', () => {
    const screen = render(<SearchBox />);

    const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);

    expect(input).toBeInTheDocument();
  });

  it('should render search input with valid value', () => {
    const screen = render(<SearchBox />);

    const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);

    expect(input).toHaveValue(queryValue);
  });

  it('should update input value on change', () => {
    const screen = render(<SearchBox />);
    const value = 'test';

    const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);

    userEvent.type(input, value);

    expect(input).toHaveValue(value);
  });

  it('should call handleSubmit on Enter key press', async () => {
    const screen = render(<SearchBox />);
    const value = 'test';

    const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);
    await userEvent.type(input, value);
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(setQueryValue).toHaveBeenCalledOnce();
  });

  it('should call handleSubmit on button click', async () => {
    const screen = render(<SearchBox />);
    const value = 'test';

    const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);
    const btn = screen.getByRole('button');
    await userEvent.type(input, value);
    await userEvent.click(btn);

    expect(setQueryValue).toHaveBeenCalledOnce();
  });
});
