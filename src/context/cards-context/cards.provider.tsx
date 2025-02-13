import { PropsWithChildren, useMemo, useState } from 'react';
import { SpacecraftsResponse } from '@/api/types';
import { CardsContext } from './cards.context';

interface Props extends PropsWithChildren {
  cards: SpacecraftsResponse;
}

export function CardsProvider(props: Props) {
  const [cards, setCards] = useState<SpacecraftsResponse | null>(null);

  const value = useMemo(
    () => ({
      cards,
      setCards,
    }),
    [cards, setCards]
  );

  return <CardsContext.Provider value={value} {...props} />;
}
