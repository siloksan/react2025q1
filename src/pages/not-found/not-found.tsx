import { Link } from 'react-router';

import styles from './not-found.module.scss';

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 Page Not Found</h1>
      <p className={styles.description}>Sorry, this page does not exist</p>
      <Link to="/" className={styles.link}>
        Return to the Main page
      </Link>
    </div>
  );
}
