import type { Spacecraft } from '~/service/types';
import styles from './card.module.scss';
import { useQueryState } from '~/hooks/use-query-state';
import { BROWSER_ROUTES } from '~/service/routes';
import { useAppDispatch, useAppSelector } from '~/store/store.hooks';
import type { AppState } from '~/store/store.types';
import { removeCard, selectCard } from '~/store/features';
import type { ComponentProps } from 'react';

export const CARD_TESTID = 'card_testid';
interface Props {
  readonly cardInfo: Spacecraft;
}

export function Card({ cardInfo }: Props) {
  const { name, dateStatus = 'unknown' } = cardInfo;
  const { params, redirectWithQuery } = useQueryState();
  const { spacecraftId } = params;
  const dispatch = useAppDispatch();

  const selectedCards = useAppSelector(
    (state: AppState) => state.selectedCards.value
  );

  let containerClassName = `${styles.container}`;
  const cardId = cardInfo.uid;

  if (spacecraftId === cardId) {
    containerClassName += ` ${styles.active}`;
  }

  function openDetails() {
    redirectWithQuery(`${BROWSER_ROUTES.CARD_DETAILS(cardInfo.uid)}`);
  }

  function closeDetails() {
    redirectWithQuery(`${BROWSER_ROUTES.CARDS}`);
  }

  const handleClick = () => {
    if (spacecraftId === cardId) {
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
