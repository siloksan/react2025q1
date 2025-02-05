import { Link, useParams } from 'react-router';
import { Spacecraft } from '../../api/types';
import styles from './card.module.scss';
import { useEffect, useState } from 'react';
import { useQueryState } from '../../hooks/use-query-state';
import { CLIENT_ROUTES } from '../../routes/routes';

interface Props {
  readonly cardInfo: Spacecraft;
}

export function Card({ cardInfo }: Props) {
  const { name, dateStatus = 'unknown', status = 'unknown', uid } = cardInfo;
  const { spacecraftId } = useParams();
  const { searchParams } = useQueryState();

  const [className, setClassName] = useState(`${styles.container}`);

  useEffect(() => {
    if (spacecraftId === uid) {
      setClassName(`${styles.container} ${styles.active}`);
    } else {
      setClassName(`${styles.container}`);
    }
  }, [spacecraftId, uid]);

  return (
    <li className={className}>
      <Link
        to={`${CLIENT_ROUTES.SPACECRAFTS}/${uid}?${searchParams.toString()}`}
      >
        <h2>
          <strong>Name:</strong> {name}
        </h2>
        <p>
          <strong>Date of creation:</strong> {dateStatus}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
      </Link>
    </li>
  );
}
