import { MouseEventHandler, useRef } from 'react';
import { CardsBlock } from './components/cards-block/cards-block';

import styles from './main.module.scss';

export function Main() {
  // const cardsList = useSelector((state: RootState) => state.cardsList.value);
  // const {
  //   page: { pageNumber, totalPages },
  // } = cardsList;
  // const { searchParams } = useQueryState();
  const ref = useRef<HTMLDivElement>(null);
  // const navigate = useNavigate();

  const closeDetails: MouseEventHandler<HTMLDivElement> = (event) => {
    if (ref.current?.contains(event.target as Node)) {
      return;
    }

    //   navigate(`/?${searchParams.toString()}`);
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
          {/* <Pagination
              currentPage={pageNumber + PAGE_OFFSET}
              totalPages={totalPages}
            /> */}
          {/* <SearchBox /> */}
          <CardsBlock />
          {/* <Flyout /> */}
        </div>
      </main>
    </div>
  );
}
