import { useRef } from 'react';
import { QueryKeys } from '../constants/query-keys';

export function useStorage() {
  const localStorageRef = useRef(localStorage);

  function getValueFromStorage(key: QueryKeys) {
    return localStorageRef.current.getItem(key);
  }

  function setValueInStorage(key: QueryKeys, value: string) {
    localStorageRef.current.setItem(key, value);
  }

  return { getValueFromStorage, setValueInStorage };
}
