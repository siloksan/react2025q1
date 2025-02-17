import { useRouter } from 'next/router';
import { Spacecraft } from '../../api/types';
import { BROWSER_ROUTES } from '@/api/routes';
import { omitKeyFromObject } from '@/utils/omit-key-from-object';
import { useAppDispatch, useAppSelector } from '@/store/store.hooks';
import { removeCard, selectCard, setDetailsLoading } from '@/store/features';
import { AppState } from '@/store/store.types';
import { ComponentProps } from 'react';

import styles from './card.module.scss';

export const CARD_TESTID = 'card_testid';

interface Props {
  readonly cardInfo: Spacecraft;
}

export function Card({ cardInfo }: Props) {
  const { name, dateStatus = 'unknown' } = cardInfo;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { query } = router;

  const selectedCards = useAppSelector(
    (state: AppState) => state.selectedCards.value
  );

  let containerClassName = `${styles.container}`;
  const cardId = cardInfo.uid;
  const paramsId = router.query.spacecraftId;

  if (cardId === paramsId) {
    containerClassName += ` ${styles.active}`;
  }

  const newQuery = omitKeyFromObject('spacecraftId', query);

  function openDetails() {
    dispatch(setDetailsLoading(true));
    router.push({
      pathname: `${BROWSER_ROUTES.CARD_DETAILS(cardInfo.uid)}`,
      query: { ...newQuery },
    });
  }

  function closeDetails() {
    router.push({
      pathname: `${BROWSER_ROUTES.CARDS}`,
      query: { ...newQuery },
    });
  }

  const handleClick = () => {
    if (cardId === paramsId) {
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
