import ErrorBoundary from '../../shared/errorBoundary/ErrorBoundary';
import { ErrorButton } from './components/error-button/error-button';
import { Header } from '../../components/header/header';
import { CardsList } from '../../components/cards-list/cards-list';

import styles from './main.module.scss';

export function Main() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <ErrorBoundary>
          <h1 className={styles.title}>Books Beyond</h1>
          <CardsList />
        </ErrorBoundary>
        <ErrorButton />
      </main>
    </div>
  );
}
