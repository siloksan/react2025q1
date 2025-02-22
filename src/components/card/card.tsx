'use client';

import { Spacecraft } from '../../api/types';
import { useAppDispatch, useAppSelector } from '@/store/store.hooks';
import { AppState } from '@/store/store.types';
import { usePathname } from 'next/navigation';

import styles from './card.module.scss';
import { BROWSER_ROUTES } from '@/api/routes';
import { useQueryState } from '@/hooks';
import { ComponentProps } from 'react';
import { removeCard, selectCard } from '@/store/features';

export const CARD_TESTID = 'card_testid';
interface Props {
  readonly cardInfo: Spacecraft;
}

export function Card({ cardInfo }: Props) {
  const { name, dateStatus = 'unknown' } = cardInfo;
  const pathName = usePathname();
  const { redirectWithQuery } = useQueryState();
  const dispatch = useAppDispatch();

  const selectedCards = useAppSelector(
    (state: AppState) => state.selectedCards.value
  );

  console.log('selectedCards: ', selectedCards);

  let containerClassName = `${styles.container}`;
  const cardId = cardInfo.uid;

  if (pathName.includes(cardId)) {
    containerClassName += ` ${styles.active}`;
  }

  function openDetails() {
    redirectWithQuery(`${BROWSER_ROUTES.CARD_DETAILS(cardInfo.uid)}`);
  }

  function closeDetails() {
    redirectWithQuery(`${BROWSER_ROUTES.CARDS}`);
  }

  const handleClick = () => {
    if (pathName.includes(cardId)) {
      closeDetails();
    } else {
      openDetails();
    }
  };

  const handleCheck: ComponentProps<'input'>['onClick'] = (e) => {
    e.stopPropagation();
    if (e.target instanceof HTMLInputElement) {
      const { checked } = e.target;
      if (checked) {
        dispatch(selectCard(cardInfo));
      } else {
        dispatch(removeCard(cardId));
      }
    }
  };

  const isChecked = selectedCards.some((card) => cardId === card.uid);

  return (
    <li
      className={containerClassName}
      onClick={handleClick}
      data-testid={CARD_TESTID}
    >
      <input
        className={styles.checkbox}
        type="checkbox"
        onClick={handleCheck}
        checked={isChecked}
        onChange={() => {}}
      />
      <h2>
        <strong>Name:</strong> {name}
      </h2>
      <p>
        <strong>Date of creation:</strong> {dateStatus}
      </p>
    </li>
  );
}
