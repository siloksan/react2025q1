import { PropsWithChildren, Suspense } from 'react';
import { getCards } from '@/app/api/cards/get-cards';
import { Loader } from '../shared/loader/loader';
import { CardsBlock } from './components/cards-block/cards-block';
import { getSpacecraft } from '@/app/api/spacecrafts/[spacecraftId]/get-spacecraft';

interface Props extends PropsWithChildren {
  page: number;
  searchTerm: string;
  spacecraftId?: string;
}

export function Main({ searchTerm, page, spacecraftId }: Props) {
  const cardsResponse = getCards({ name: searchTerm, page });
  const spacecraftResponse = spacecraftId ? getSpacecraft(spacecraftId) : null;

  return (
    <Suspense fallback={<Loader />}>
      <CardsBlock
        cardsResponse={cardsResponse}
        spacecraftResponse={spacecraftResponse}
      />
    </Suspense>
  );
}
