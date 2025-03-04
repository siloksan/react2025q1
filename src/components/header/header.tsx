import { Link } from 'react-router';

import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <h2>React Form</h2>
      <Link to="/">Go Home</Link>
    </header>
  );
}
