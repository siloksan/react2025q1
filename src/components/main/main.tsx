import { MouseEventHandler, useRef } from 'react';
import { CardsBlock } from './components/cards-block/cards-block';
import { Pagination } from '../pagination/pagination';
import { PAGE_OFFSET } from '@/constants/view';
import { useQueryState } from '@/hooks/use-query-state';
import { QUERY_KEYS } from '@/constants';
import { setLoading } from '@/store/features';
import { Loader } from '../shared/loader/loader';
import { useAppDispatch, useAppSelector } from '@/store/store.hooks';
import { AppState } from '@/store/store.types';

import styles from './main.module.scss';
import { omitKeyFromObject } from '@/utils';
import { BROWSER_ROUTES } from '@/api/routes';
import { useRouter } from 'next/router';

export function Main() {
  const { setQueryValue } = useQueryState();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const { value: cardsList, isLoading } = useAppSelector(
    (state: AppState) => state.cardsList
  );

  const {
    page: { pageNumber, totalPages },
  } = cardsList ?? { page: { pageNumber: 0, totalPages: 0 } };

  function handlePageChange(pageNumber: number) {
    const newQueries = [{ key: QUERY_KEYS.PAGE, value: pageNumber.toString() }];
    dispatch(setLoading(true));
    setQueryValue(newQueries);
  }

  const closeDetails: MouseEventHandler<HTMLDivElement> = (event) => {
    if (ref.current?.contains(event.target as Node)) {
      return;
    }

    const { query } = router;
    const newQuery = omitKeyFromObject('spacecraftId', query);
    router.push({
      pathname: `${BROWSER_ROUTES.CARDS}`,
      query: { ...newQuery },
    });
  };

  return (
    <div
      className={styles.wrapper}
      role="button"
      tabIndex={0}
      onClick={closeDetails}
      onKeyDown={() => {}}
    >
      <main className={styles.main}>
        <h1 className={styles.title}>Star ships</h1>
        <div ref={ref}>
          {/* <SearchBox /> */}
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <CardsBlock />
              <Pagination
                currentPage={pageNumber + PAGE_OFFSET}
                totalPages={totalPages}
                handleClick={handlePageChange}
              />
              {/* <Flyout /> */}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
