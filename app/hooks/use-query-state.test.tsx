import { useStorage } from './use-storage';
import { QUERY_KEYS } from '../constants/query-keys';
import { type Mock } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useQueryState } from './use-query-state';
import { useNavigate, useParams, useSearchParams } from 'react-router';

vi.mock('react-router', () => ({
  useSearchParams: vi.fn(),
  useParams: vi.fn(),
  useNavigate: vi.fn(),
}));

vi.mock('./use-storage', () => ({
  useStorage: vi.fn(),
}));

describe('useQueryState', () => {
  const getValueFromStorage = vi.fn();
  const setValueInStorage = vi.fn();
  const setSearchParams = vi.fn();
  const navigate = vi.fn();
  const params = vi.fn();
  let searchParams: URLSearchParams;

  beforeEach(() => {
    searchParams = new URLSearchParams();

    (useStorage as Mock).mockReturnValue({
      getValueFromStorage,
      setValueInStorage,
    });

    (useSearchParams as Mock).mockReturnValue([searchParams, setSearchParams]);
    (useParams as Mock).mockReturnValue(params);
    (useNavigate as Mock).mockReturnValue(navigate);
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
