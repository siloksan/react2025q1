import { useNavigate, useParams } from 'react-router';
import { Spacecraft } from '../../api/types';
import styles from './card.module.scss';
import { useEffect, useState } from 'react';
import { useQueryState } from '../../hooks/use-query-state';
import { CLIENT_ROUTES } from '../../routes/routes';

interface Props {
  readonly cardInfo: Spacecraft;
}

export function Card({ cardInfo }: Props) {
  const { name, dateStatus = 'unknown', uid } = cardInfo;
  const { spacecraftId } = useParams();
  const { searchParams } = useQueryState();
  const navigate = useNavigate();

  const [className, setClassName] = useState(`${styles.container}`);

  useEffect(() => {
    if (spacecraftId === uid) {
      setClassName(`${styles.container} ${styles.active}`);
    } else {
      setClassName(`${styles.container}`);
    }
  }, [spacecraftId, uid]);

  function openDetails() {
    navigate(`${CLIENT_ROUTES.SPACECRAFTS}/${uid}?${searchParams.toString()}`);
  }

  function closeDetails() {
    navigate(`/?${searchParams.toString()}`);
  }

  const handleClick = () => {
    if (spacecraftId === uid) {
      closeDetails();
    } else {
      openDetails();
    }
  };

  return (
    <li className={className} onClick={handleClick}>
      <h2>
        <strong>Name:</strong> {name}
      </h2>
      <p>
        <strong>Date of creation:</strong> {dateStatus}
      </p>
    </li>
  );
}
