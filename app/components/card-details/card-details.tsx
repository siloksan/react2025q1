import { useQueryState } from '~/hooks/use-query-state';
import type { Spacecraft } from '~/service/types';
import { BROWSER_ROUTES } from '~/service/routes';

import styles from './card-details.module.scss';

interface Props {
  spacecraft: Spacecraft;
}

export function CardDetails({ spacecraft }: Props) {
  const { redirectWithQuery } = useQueryState();

  function closeDetails() {
    redirectWithQuery(BROWSER_ROUTES.CARDS);
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
