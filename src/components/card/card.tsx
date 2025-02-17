// import { useNavigate, useParams } from 'react-router';
import { useRouter } from 'next/router';
import { Spacecraft } from '../../api/types';
// import { useQueryState } from '../../hooks/use-query-state';
// import { CLIENT_ROUTES } from '../../routes/routes.constant';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../store/store';
// import { ComponentProps } from 'react';
// import { removeCard, selectCard } from '../../store/features';

import styles from './card.module.scss';
import { BROWSER_ROUTES } from '@/api/routes';
import { omitKeyFromObject } from '@/utils/omit-key-from-object';
import { useAppDispatch } from '@/store/store.hooks';
import { setDetailsLoading } from '@/store/features';

export const CARD_TESTID = 'card_testid';

interface Props {
  readonly cardInfo: Spacecraft;
}

export function Card({ cardInfo }: Props) {
  const { name, dateStatus = 'unknown' } = cardInfo;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { query } = router;

  // const selectedCards = useSelector(
  //   (state: RootState) => state.selectedCards.value
  // );

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
      onClick={handleClick}
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
