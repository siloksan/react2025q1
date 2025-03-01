import { useCallback, type ComponentProps } from 'react';
import styles from './cards-list.module.scss';
import { Card } from '../card/card';
import type { SpacecraftsResponse } from '~/service/types';

interface Props extends ComponentProps<'ul'> {
  cards: SpacecraftsResponse;
}

export function CardsList({ className = '', cards }: Props) {
  const renderList = useCallback(() => {
    if (cards.spacecrafts.length === 0) {
      return <h1 className={styles.not_found}>No spacecrafts found</h1>;
    }

    return cards.spacecrafts.map((card) => (
      <Card cardInfo={card} key={card.uid} />
    ));
  }, [cards]);

  return <ul className={`${styles.list} ${className}`}>{renderList()}</ul>;
}
