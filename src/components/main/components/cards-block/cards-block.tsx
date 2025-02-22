import { CardsList } from '@/components/cards-list/cards-list';
import { PropsWithChildren, use } from 'react';
import { Pagination } from '@/components/pagination/pagination';
import { PAGE_OFFSET } from '@/constants/view';
import { SpacecraftsResponse } from '@/api/types';

import styles from './cards-block.module.scss';

interface Props extends PropsWithChildren {
  cardsResponse: Promise<SpacecraftsResponse>;
}

export function CardsBlock({ cardsResponse }: Props) {
  const cards = use(cardsResponse);
  const {
    page: { pageNumber, totalPages },
  } = cards ?? { page: { pageNumber: 0, totalPages: 0 } };

  return (
    <>
      <div className={styles.container}>
        <CardsList cards={cards} />
        {/* <ErrorBoundary> */}
        {/* <CardDetails /> */}
        {/* </ErrorBoundary> */}
      </div>
      <Pagination
        currentPage={pageNumber + PAGE_OFFSET}
        totalPages={totalPages}
      />
    </>
  );
}
