import { useStorage } from './use-storage';
import { QueryKeys } from '../constants/query-keys';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface NewQueries {
  key: QueryKeys;
  value: string;
}

export function useQueryState() {
  const { setValueInStorage } = useStorage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const newSearchParams = new URLSearchParams(searchParams.toString());

  function setQueryValue(newQueries: NewQueries[]) {
    newQueries.forEach(({ key, value }) => {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }

      setValueInStorage(key, value);
    });

    router.push(`${pathName}?${newSearchParams.toString()}`);
  }

  return { searchParams: newSearchParams, setQueryValue };
}
