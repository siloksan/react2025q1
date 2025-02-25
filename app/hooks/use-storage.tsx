import type { QueryKeys } from '~/constants';

export type LocalStorageKeys = QueryKeys;

export function useStorage() {
  if (typeof window === 'undefined') {
    return {
      getValueFromStorage: () => null,
      setValueInStorage: () => null,
    };
  }

  function getValueFromStorage(key: LocalStorageKeys) {
    return localStorage.getItem(key);
  }

  function setValueInStorage(key: LocalStorageKeys, value: string) {
    localStorage.setItem(key, value);
  }

  return { getValueFromStorage, setValueInStorage };
}
