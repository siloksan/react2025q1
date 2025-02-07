import ErrorBoundary from '../../shared/errorBoundary/ErrorBoundary';
import { ErrorButton } from './components/error-button/error-button';
import { SearchBox } from '../../components/search-bar/search-box';
import { Pagination } from '../../components/pagination/pagination';
import { MouseEventHandler, useRef, useState } from 'react';
import { SpacecraftsResponse } from '../../api/types';
import {
  FIRST_PAGE,
  PAGE_OFFSET,
} from '../../components/cards-list/cards-list.constants';
import { CardsBlock } from './components/cards-block/cards-block';

import styles from './main.module.scss';
import { useQueryState } from '../../hooks/use-query-state';
import { useNavigate } from 'react-router';

export function Main() {
  const [data, setData] = useState<SpacecraftsResponse | null>(null);
  const { totalPages = 0, pageNumber = FIRST_PAGE } = data?.page ?? {};
  const { searchParams } = useQueryState();
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const closeDetails: MouseEventHandler<HTMLDivElement> = (event) => {
    if (ref.current?.contains(event.target as Node)) {
      return;
    }

    navigate(`/?${searchParams.toString()}`);
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
        <ErrorBoundary>
          <h1 className={styles.title}>Star ships</h1>
          <div ref={ref}>
            <Pagination
              currentPage={pageNumber + PAGE_OFFSET}
              totalPages={totalPages}
            />
            <SearchBox />
            <CardsBlock data={data} setData={setData} />
          </div>
        </ErrorBoundary>
        <ErrorButton />
      </main>
    </div>
  );
}
