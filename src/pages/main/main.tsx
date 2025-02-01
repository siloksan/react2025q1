import ErrorBoundary from '../../shared/errorBoundary/ErrorBoundary';
import { ErrorButton } from './components/error-button/error-button';
import { CardsList } from '../../components/cards-list/cards-list';
import { SearchBox } from '../../components/search-bar/search-box';
import { Pagination } from '../../components/pagination/Pagination';

import styles from './main.module.scss';
import { useState } from 'react';
import { SpacecraftsResponse } from '../../api/types';
import {
  FIRST_PAGE,
  PAGE_OFFSET,
} from '../../components/cards-list/cards-list.constants';

let count = 0;

export function Main() {
  const [data, setData] = useState<SpacecraftsResponse | null>(null);
  const { totalPages = 0, pageNumber = FIRST_PAGE } = data?.page ?? {};

  console.log('count: ', count++);
  return (
    <main className={styles.main}>
      <ErrorBoundary>
        <h1 className={styles.title}>Star ships</h1>
        <Pagination
          currentPage={pageNumber + PAGE_OFFSET}
          totalPages={totalPages}
        />
        <SearchBox />
        <CardsList data={data} setData={setData} />
      </ErrorBoundary>
      <ErrorButton />
    </main>
  );
}
