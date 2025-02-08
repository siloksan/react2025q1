import { Loader } from '../shared/loader/loader';
import { useQueryState } from '../../hooks/use-query-state';
import { useNavigate, useParams } from 'react-router';
import { useGetCardDetailsQuery } from '../../api/api-root';

import styles from './card-details.module.scss';

export default function CardDetails() {
  const { spacecraftId } = useParams();
  const { searchParams } = useQueryState();
  const navigate = useNavigate();
  const { data, isFetching, isError, error } = useGetCardDetailsQuery(
    spacecraftId ?? ''
  );

  const closeDetails = () => {
    navigate(`/?${searchParams.toString()}`);
  };

  if (isError) {
    throw error;
  }

  if (isFetching) {
    return <Loader />;
  }

  if (!data) {
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
  } = data.spacecraft;

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
