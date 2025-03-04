import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Card } from '../card/card';

import styles from './home.module.scss';

export function Home() {
  const usersData = useSelector((state: RootState) => state.usersData);

  const renderUsers = () => {
    return usersData.map((user, idx) => {
      const isNewUser = idx === 0;

      return (
        <li
          className={`${styles.item} ${isNewUser ? styles.first : ''}`}
          key={user.id}
        >
          <Card {...user} />
        </li>
      );
    });
  };

  return (
    <section className={styles.container}>
      <h1>Home Page</h1>
      <ul className={styles.links}>
        <li>
          <Link to="/controlled-form">Controlled Form</Link>
        </li>
        <li>
          <Link to="/uncontrolled-form">Uncontrolled Form</Link>
        </li>
      </ul>
      <ul className={styles.users}>{renderUsers()}</ul>
    </section>
  );
}
