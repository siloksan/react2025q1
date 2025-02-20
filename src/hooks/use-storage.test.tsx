import { renderHook, act } from '@testing-library/react';
import { useStorage } from './use-storage';
import { QUERY_KEYS } from '@/constants';

describe('useStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const key = QUERY_KEYS.NAME;
  const testValue = 'test';

  it('should get value from localStorage', () => {
    localStorage.setItem(key, testValue);

    const { result } = renderHook(() => useStorage());

    const value = result.current.getValueFromStorage(key);
    expect(value).toBe(value);
  });

  it('should set value in localStorage', () => {
    const { result } = renderHook(() => useStorage());

    act(() => {
      result.current.setValueInStorage(key, testValue);
    });

    const value = localStorage.getItem(key);
    expect(value).toBe(testValue);
  });
});
