import ErrorBoundary from '../../shared/errorBoundary/ErrorBoundary';
import { ErrorButton } from './components/error-button/error-button';
import { CardsList } from '../../components/cards-list/cards-list';

import styles from './main.module.scss';

export function Main() {
  return (
    <main className={styles.main}>
      <ErrorBoundary>
        <h1 className={styles.title}>Star Ships</h1>
        <CardsList />
      </ErrorBoundary>
      <ErrorButton />
    </main>
  );
}
