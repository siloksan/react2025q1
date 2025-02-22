import { PropsWithChildren, Suspense } from 'react';
import { getCards } from '@/app/api/cards/get-cards';
import { Loader } from '../shared/loader/loader';
import { CardsBlock } from './components/cards-block/cards-block';

interface Props extends PropsWithChildren {
  page: number;
  searchTerm: string;
  spacecraftId?: string;
}

export function Main({ searchTerm, page }: Props) {
  const cardsResponse = getCards({ name: searchTerm, page });

  return (
    <Suspense fallback={<Loader />}>
      <CardsBlock cardsResponse={cardsResponse} />
    </Suspense>
  );
}
