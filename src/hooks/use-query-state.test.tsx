import { useStorage } from './use-storage';
import { useRouter } from 'next/router';
import { useQueryState } from './use-query-state';
import { Mock } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QUERY_KEYS } from '../constants/query-keys';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('./use-storage', () => ({
  useStorage: vi.fn(),
}));

describe('useQueryState', () => {
  const setValueInStorage = vi.fn();
  const query = {};
  const push = vi.fn();

  beforeEach(() => {
    (useStorage as Mock).mockReturnValue({
      setValueInStorage,
    });

    (useRouter as Mock).mockReturnValue({
      query,
      push,
      pathname: '/test-path',
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  it('should initialize with searchParams and setQueryValue', () => {
    const { result } = renderHook(() => useQueryState());

    expect(result.current.searchParams).toBe(query);
    expect(typeof result.current.setQueryValue).toBe('function');
  });

  it('should set query value and update local storage', () => {
    const { result } = renderHook(() => useQueryState());
    const queryValue = 'test';

    act(() => {
      result.current.setQueryValue([
        { key: QUERY_KEYS.NAME, value: queryValue },
      ]);
    });

    expect(setValueInStorage).toHaveBeenCalledWith(QUERY_KEYS.NAME, queryValue);
    expect(push).toHaveBeenCalledWith({
      pathname: '/test-path',
      query: { [QUERY_KEYS.NAME]: queryValue },
    });
  });

  it('should remove query value and update local storage', () => {
    const { result } = renderHook(() => useQueryState());

    act(() => {
      result.current.setQueryValue([{ key: QUERY_KEYS.NAME, value: '' }]);
    });

    expect(setValueInStorage).toHaveBeenCalledWith(QUERY_KEYS.NAME, '');

    expect(push).toHaveBeenCalledWith({
      pathname: '/test-path',
      query: {},
    });
  });
});
