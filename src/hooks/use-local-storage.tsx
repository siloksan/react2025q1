import { useCallback, useState } from 'react';

export const LOCALE_KEY = { VISITED_COUNTRIES: 'visitedCountries' } as const;

export type LocaleKey = (typeof LOCALE_KEY)[keyof typeof LOCALE_KEY];

export function useLocalStorage<T>(key: LocaleKey, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);

    if (storedValue) {
      return JSON.parse(storedValue);
    }

    return defaultValue;
  });

  const setStoredValue = useCallback(
    (value: T) => {
      setValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key]
  );

  return { storedValue: value, setStoredValue };
}
