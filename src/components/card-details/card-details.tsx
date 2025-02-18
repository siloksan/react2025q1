import { Loader } from '../shared/loader/loader';
import { useAppSelector } from '@/store/store.hooks';
import { AppState } from '@/store/store.types';
import { useRouter } from 'next/router';

import styles from './card-details.module.scss';
import { BROWSER_ROUTES } from '@/api/routes';
import { omitKeyFromObject } from '@/utils';

export function CardDetails() {
  const router = useRouter();
  const { value: spacecraft, isLoading } = useAppSelector(
    (state: AppState) => state.cardDetails
  );

  function closeDetails() {
    const { query } = router;
    const newQuery = omitKeyFromObject('spacecraftId', query);
    router.push({
      pathname: `${BROWSER_ROUTES.CARDS}`,
      query: { ...newQuery },
    });
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!spacecraft) {
    return null;
  }

  const {
    name,
    owner,
    registry = 'unknown',
    operator,
    dateStatus = 'unknown',
    spacecraftClass,
    status = 'unknown',
  } = spacecraft;

  const ownerName = owner ? owner.name : 'unknown';
  const operatorName = operator ? operator.name : 'unknown';

  const leftSide = (
    <div>
      <p>
        <strong>Registry code:</strong> {registry}
      </p>
      <p>
        <strong>Date of creation:</strong> {dateStatus}
      </p>
      <p>
        <strong>Owner:</strong> {ownerName}
      </p>
      <p>
        <strong>Managed By:</strong> {operatorName}
      </p>
      <p>
        <strong>Status:</strong> {status}
      </p>
    </div>
  );

  const rightSide = spacecraftClass ? (
    <div>
      <p>
        <strong>Class:</strong> {spacecraftClass.name}
      </p>
      <p>
        <strong>Crew:</strong> {spacecraftClass.crew || 'unknown'}
      </p>
      <p>
        <strong>activeFrom:</strong> {spacecraftClass.activeFrom}
      </p>
      <p>
        <strong>activeTo:</strong> {spacecraftClass.activeTo}
      </p>
    </div>
  ) : null;

  return (
    <aside className={styles.container} data-testid="card-details">
      <h3>
        <strong>Name:</strong> {name}
      </h3>
      <div className={styles.sides}>
        {leftSide}
        {rightSide}
      </div>
      <button className={styles.btn} onClick={closeDetails} type="button">
        Close details
      </button>
    </aside>
  );
}
