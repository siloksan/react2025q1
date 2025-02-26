import { useNavigate, useParams, useSearchParams } from 'react-router';
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
 * @returns {object} An object containing:
 * - `searchParams`: The current URL search parameters.
 * - `setQueryValue`: A function to update query parameters and local storage.
 * - `params`: The current URL parameters.
 * - `redirectWithQuery`: A function to navigate to a new path with the current query parameters.
 *
 * @example
 * const { searchParams, setQueryValue, params, redirectWithQuery } = useQueryState();
 *
 * // Update query parameters
 * setQueryValue([{ key: 'page', value: '2' }]);
 *
 * // Redirect to a new path with the current query parameters
 * redirectWithQuery('/new-path');
 */
export function useQueryState() {
  const { getValueFromStorage, setValueInStorage } = useStorage();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
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

  function redirectWithQuery(newPathName: string) {
    navigate(`${newPathName}?${searchParams.toString()}`);
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

  return { searchParams, setQueryValue, params, redirectWithQuery };
}
