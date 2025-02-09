import { useRef } from 'react';
import { QueryKeys } from '../constants/query-keys';
import { THEME_LOCALSTORAGE_KEY } from '../context/theme.constants';

export type LocalStorageKeys = QueryKeys | typeof THEME_LOCALSTORAGE_KEY;

export function useStorage() {
  const localStorageRef = useRef(localStorage);

  function getValueFromStorage(key: LocalStorageKeys) {
    return localStorageRef.current.getItem(key);
  }

  function setValueInStorage(key: LocalStorageKeys, value: string) {
    localStorageRef.current.setItem(key, value);
  }

  return { getValueFromStorage, setValueInStorage };
}
