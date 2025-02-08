import { useRef } from 'react';
import { QueryKeys } from '../constants/query-keys';
import { THEME_LOCALSTORAGE_QEY } from '../context/theme.constants';

export type LocalStorageQey = QueryKeys | typeof THEME_LOCALSTORAGE_QEY;

export function useStorage() {
  const localStorageRef = useRef(localStorage);

  function getValueFromStorage(key: LocalStorageQey) {
    return localStorageRef.current.getItem(key);
  }

  function setValueInStorage(key: LocalStorageQey, value: string) {
    localStorageRef.current.setItem(key, value);
  }

  return { getValueFromStorage, setValueInStorage };
}
