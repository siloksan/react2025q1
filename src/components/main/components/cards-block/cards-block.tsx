import { CardsList } from '@/components/cards-list/cards-list';
import { PropsWithChildren, Suspense, use } from 'react';
import { Pagination } from '@/components/pagination/pagination';
import { PAGE_OFFSET } from '@/constants/view';
import { SpacecraftResponse, SpacecraftsResponse } from '@/api/types';

import styles from './cards-block.module.scss';
import { CardDetails } from '@/components/card-details/card-details';
import { Loader } from '@/components/shared/loader/loader';

interface Props extends PropsWithChildren {
  cardsResponse: Promise<SpacecraftsResponse>;
  spacecraftResponse: Promise<SpacecraftResponse> | null;
}

export function CardsBlock({ cardsResponse, spacecraftResponse }: Props) {
  const cards = use(cardsResponse);

  const {
    page: { pageNumber, totalPages },
  } = cards ?? { page: { pageNumber: 0, totalPages: 0 } };

  return (
    <>
      <div className={styles.container}>
        <CardsList cards={cards} />
        <Suspense fallback={<Loader />}>
          <CardDetails spacecraftResponse={spacecraftResponse} />
        </Suspense>
      </div>
      <Pagination
        currentPage={pageNumber + PAGE_OFFSET}
        totalPages={totalPages}
      />
    </>
  );
}
