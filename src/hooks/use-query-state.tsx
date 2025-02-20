import { useStorage } from './use-storage';
import { QUERY_KEYS, QueryKeys } from '../constants/query-keys';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

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
  const { setValueInStorage } = useStorage();
  const router = useRouter();

  const { query } = router;

  function setQueryValue(newQueries: NewQueries[]) {
    const updatedQuery = { ...query };

    newQueries.forEach(({ key, value }) => {
      if (value) {
        updatedQuery[key] = value;
      } else {
        delete updatedQuery[key];
      }

      setValueInStorage(key, value);
    });

    router.push({
      pathname: router.pathname,
      query: { ...updatedQuery },
    });
  }

  useEffect(() => {
    Object.values(QUERY_KEYS).forEach((key) => {
      const queryValue = query[key];

      if (queryValue) {
        setValueInStorage(key, queryValue as string);
      }
    });
  }, [query, setValueInStorage, router]);

  return { searchParams: query, setQueryValue };
}
