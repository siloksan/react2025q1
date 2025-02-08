import { useEffect, useState } from 'react';
import { Loader } from '../shared/loader/loader';
import { Spacecraft } from '../../api/types';
import { useQueryState } from '../../hooks/use-query-state';
import { useNavigate, useParams } from 'react-router';
import { getSpacecraft } from '../../api/services';

import styles from './card-details.module.scss';

export default function CardDetails() {
  const { spacecraftId } = useParams();
  const [data, setData] = useState<Spacecraft | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { searchParams } = useQueryState();
  const navigate = useNavigate();

  const closeDetails = () => {
    navigate(`/?${searchParams.toString()}`);
  };

  useEffect(() => {
    const getCardDetails = async (uid: string) => {
      setLoading(true);
      setData(null);

      try {
        const { spacecraft } = await getSpacecraft(uid);

        setData(spacecraft);
      } catch (err) {
        if (err instanceof Error) {
          setError('err.message');
        }
      } finally {
        setLoading(false);
      }
    };

    if (spacecraftId) {
      getCardDetails(spacecraftId);
    }
  }, [spacecraftId]);

  if (error) {
    throw new Error(error);
  }

  if (loading) {
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
  } = data;

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
