import { useQueryState } from './use-query-state';
import { useSearchParams } from 'react-router';
import { useStorage } from './use-storage';
import { QUERY_KEYS } from '../constants/query-keys';
import { Mock } from 'vitest';
import { act, renderHook } from '@testing-library/react';

vi.mock('react-router', () => ({
  useSearchParams: vi.fn(),
}));

vi.mock('./use-storage', () => ({
  useStorage: vi.fn(),
}));

describe('useQueryState', () => {
  let getValueFromStorage: Mock;
  let setValueInStorage: Mock;
  let setSearchParams: Mock;
  let searchParams: URLSearchParams;

  beforeEach(() => {
    getValueFromStorage = vi.fn();
    setValueInStorage = vi.fn();
    setSearchParams = vi.fn();
    searchParams = new URLSearchParams();

    (useStorage as Mock).mockReturnValue({
      getValueFromStorage,
      setValueInStorage,
    });

    (useSearchParams as Mock).mockReturnValue([searchParams, setSearchParams]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with searchParams and setQueryValue', () => {
    const { result } = renderHook(() => useQueryState());

    expect(result.current.searchParams).toBe(searchParams);
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
    expect(setSearchParams).toHaveBeenCalledWith(
      new URLSearchParams(`${QUERY_KEYS.NAME}=${queryValue}`)
    );
  });
});
