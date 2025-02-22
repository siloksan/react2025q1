import { CardsList } from '@/components/cards-list/cards-list';
import { PropsWithChildren, Suspense, use } from 'react';
import { Pagination } from '@/components/pagination/pagination';
import { PAGE_OFFSET } from '@/constants/view';
import { SpacecraftsResponse } from '@/api/types';
import { CardDetails } from '@/components/card-details/card-details';
import { Loader } from '@/components/shared/loader/loader';
import { getSpacecraft } from '@/app/api/spacecrafts/[spacecraftId]/get-spacecraft';

import styles from './cards-block.module.scss';

interface Props extends PropsWithChildren {
  cardsResponse: Promise<SpacecraftsResponse>;
  spacecraftId?: string;
}

export function CardsBlock({ cardsResponse, spacecraftId }: Props) {
  const cards = use(cardsResponse);
  const spacecraftResponse = spacecraftId ? getSpacecraft(spacecraftId) : null;

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
