import { useNavigate, useParams } from 'react-router';
import { Spacecraft } from '../../api/types';
import { useQueryState } from '../../hooks/use-query-state';
import { CLIENT_ROUTES } from '../../routes/routes.constant';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ComponentProps } from 'react';
import { removeCard, selectCard } from '../../store/features';

import styles from './card.module.scss';

export const CARD_TESTID = 'card_testid';

interface Props {
  readonly cardInfo: Spacecraft;
}

export function Card({ cardInfo }: Props) {
  const { name, dateStatus = 'unknown', uid } = cardInfo;
  // const { spacecraftId } = useParams();
  // const { searchParams } = useQueryState();
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const selectedCards = useSelector(
  //   (state: RootState) => state.selectedCards.value
  // );

  let containerClassName = `${styles.container}`;

  // if (spacecraftId === uid) {
  //   containerClassName += ` ${styles.active}`;
  // }

  // function openDetails() {
  //   navigate(`${CLIENT_ROUTES.SPACECRAFTS}/${uid}?${searchParams.toString()}`);
  // }

  // function closeDetails() {
  //   navigate(`/?${searchParams.toString()}`);
  // }

  // const handleClick = () => {
  //   if (spacecraftId === uid) {
  //     closeDetails();
  //   } else {
  //     openDetails();
  //   }
  // };

  // const handleCheck: ComponentProps<'input'>['onClick'] = (e) => {
  //   e.stopPropagation();
  //   if (e.target instanceof HTMLInputElement) {
  //     const { checked } = e.target;
  //     if (checked) {
  //       dispatch(selectCard(cardInfo));
  //     } else {
  //       dispatch(removeCard(uid));
  //     }
  //   }
  // };

  // const isChecked = selectedCards.some((card) => uid === card.uid);

  return (
    <li
      className={containerClassName}
      // onClick={handleClick}
      data-testid={CARD_TESTID}
    >
      <input
        className={styles.checkbox}
        type="checkbox"
        // onClick={handleCheck}
        // checked={isChecked}
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
