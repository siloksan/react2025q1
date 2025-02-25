import { useParams, useSearchParams } from 'react-router';
import { useStorage } from './use-storage';
import { QUERY_KEYS, type QueryKeys } from '../constants/query-keys';
import { useEffect } from 'react';

interface NewQueries {
  key: QueryKeys;
  value: string;
}

/**
 * Custom hook to manage query parameters in the URL and synchronize them with local storage.
 *
 * @returns {Object} An object containing:
 * - `searchParams`: The current URL search parameters.
 * - `setQueryValue`: A function to update the query parameters.
 *
 * @example
 * const { searchParams, setQueryValue } = useQueryState();
 *
 * // To set a query parameter
 * setQueryValue([{ key: 'exampleKey', value: 'exampleValue' }]);
 *
 * // To remove a query parameter
 * setQueryValue([{ key: 'exampleKey', value: null }]);
 */
export function useQueryState() {
  const { getValueFromStorage, setValueInStorage } = useStorage();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();

  function setQueryValue(newQueries: NewQueries[]) {
    const newParams = new URLSearchParams(searchParams);

    newQueries.forEach(({ key, value }) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }

      setValueInStorage(key, value);
    });

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

  return { searchParams, setQueryValue, params };
}
