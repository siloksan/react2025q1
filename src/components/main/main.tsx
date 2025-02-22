import { PropsWithChildren } from 'react';
import { getCards } from '@/app/api/cards/get-cards';
import { CardsBlock } from './components/cards-block/cards-block';

interface Props extends PropsWithChildren {
  page: number;
  searchTerm: string;
  spacecraftId?: string;
}

export function Main({ searchTerm, page, spacecraftId }: Props) {
  const cardsResponse = getCards({ name: searchTerm, page });

  return (
    <CardsBlock cardsResponse={cardsResponse} spacecraftId={spacecraftId} />
  );
}
