import ErrorBoundary from '../../components/shared/errorBoundary/ErrorBoundary';
import { ErrorButton } from './components/error-button/error-button';
import { SearchBox } from '../../components/search-bar/search-box';
import { Pagination } from '../../components/pagination/pagination';
import { PAGE_OFFSET } from '../../components/cards-list/cards-list.constants';
import { CardsBlock } from './components/cards-block/cards-block';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

import styles from './main.module.scss';

export function Main() {
  const cardsList = useSelector((state: RootState) => state.cardsList.value);
  const {
    page: { pageNumber, totalPages },
  } = cardsList;

  return (
    <main className={styles.main}>
      <ErrorBoundary>
        <h1 className={styles.title}>Star ships</h1>
        <Pagination
          currentPage={pageNumber + PAGE_OFFSET}
          totalPages={totalPages}
        />
        <SearchBox />
        <CardsBlock />
      </ErrorBoundary>
      <ErrorButton />
    </main>
  );
}
