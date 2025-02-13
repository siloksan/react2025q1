import { createContext, useContext } from 'react';
import { SpacecraftsResponse } from '@/api/types';

interface CardsContextType {
  cards: SpacecraftsResponse | null;
  setCards: (cards: SpacecraftsResponse) => void;
}

export const CardsContext = createContext<CardsContextType | undefined>(
  undefined
);

export function useCardsContext() {
  const context = useContext(CardsContext);
  if (!context)
    throw new Error('useCardsContext must be used within CardsProvider!');
  return context;
}
