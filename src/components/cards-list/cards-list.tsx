import { ComponentProps, useCallback } from 'react';
import { Card } from '../card/card';
import { useAppSelector } from '@/store/store.hooks';

import styles from './cards-list.module.scss';
import { AppState } from '@/store/store.types';

export function CardsList({ className = '' }: ComponentProps<'ul'>) {
  const cards = useAppSelector((state: AppState) => state.cardsList.value);

  const renderList = useCallback(() => {
    if (!cards) {
      return <h1 className={styles.not_found}>No spacecrafts found</h1>;
    }

    return cards.spacecrafts.map((card) => (
      <Card cardInfo={card} key={card.uid} />
    ));
  }, [cards]);

  return <ul className={`${styles.list} ${className}`}>{renderList()}</ul>;
}
