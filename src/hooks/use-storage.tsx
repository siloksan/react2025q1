import { useRef } from 'react';

export const LOCALE_STORAGE_KEYS = {
  SEARCH_TERM: 'SEARCH_TERM',
  CURRENT_PAGE: 'CURRENT_PAGE',
} as const;

export type StorageKeys =
  (typeof LOCALE_STORAGE_KEYS)[keyof typeof LOCALE_STORAGE_KEYS];

export function useStorage() {
  const localStorageRef = useRef(localStorage);

  function getValue(key: StorageKeys) {
    return localStorageRef.current.getItem(key);
  }

  function setValue(key: StorageKeys, value: string) {
    localStorageRef.current.setItem(key, value);
  }

  return { getValue, setValue };
}
