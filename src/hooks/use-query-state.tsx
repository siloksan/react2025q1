import { useSearchParams } from 'react-router';
import { useStorage } from './use-storage';
import { QUERY_KEYS, QueryKeys } from '../constants/query-keys';
import { useEffect } from 'react';

export function useQueryState() {
  const { getValueFromStorage, setValueInStorage } = useStorage();
  const [searchParams, setSearchParams] = useSearchParams();

  function setQueryValue(key: QueryKeys, value: string) {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    setValueInStorage(key, value);
    setSearchParams(newParams);
  }

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    Object.values(QUERY_KEYS).forEach((key) => {
      const queryValue = searchParams.get(key);
      const storageValue = getValueFromStorage(key);

      if (queryValue) {
        setValueInStorage(key, queryValue);
      }

      if (!queryValue && storageValue) {
        newParams.set(key, storageValue);
      }

      setSearchParams(newParams);
    });
  }, []);

  return { searchParams, setQueryValue };
}
