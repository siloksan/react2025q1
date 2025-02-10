import { ErrorBoundary } from '../../components/shared/errorBoundary/ErrorBoundary';
import { ErrorButton } from './components/error-button/error-button';
import { SearchBox } from '../../components/search-bar/search-box';
import { Pagination } from '../../components/pagination/pagination';
import { MouseEventHandler, useRef } from 'react';
import { CardsBlock } from './components/cards-block/cards-block';
import { Flyout } from '../../components/flyout/flyout';
import { PAGE_OFFSET } from '../../components/cards-list/cards-list.constants';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { useQueryState } from '../../hooks/use-query-state';
import { useNavigate } from 'react-router';

import styles from './main.module.scss';

export function Main() {
  const cardsList = useSelector((state: RootState) => state.cardsList.value);
  const {
    page: { pageNumber, totalPages },
  } = cardsList;
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
            <CardsBlock />
            <Flyout />
          </div>
        </ErrorBoundary>
        <ErrorButton />
      </main>
    </div>
  );
}
