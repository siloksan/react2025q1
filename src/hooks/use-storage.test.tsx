import { renderHook, act } from '@testing-library/react';
import { useStorage } from './use-storage';
import { THEME_LOCALSTORAGE_KEY, Themes } from '../context/theme.constants';

describe('useStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const key = THEME_LOCALSTORAGE_KEY;
  const themeValue = Themes.light;

  it('should get value from localStorage', () => {
    localStorage.setItem(key, themeValue);

    const { result } = renderHook(() => useStorage());

    const value = result.current.getValueFromStorage(key);
    expect(value).toBe(themeValue);
  });

  it('should set value in localStorage', () => {
    const { result } = renderHook(() => useStorage());

    act(() => {
      result.current.setValueInStorage(key, themeValue);
    });

    const value = localStorage.getItem(key);
    expect(value).toBe(themeValue);
  });
});
