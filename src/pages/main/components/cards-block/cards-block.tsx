import { Outlet } from 'react-router';
import { CardsList } from '../../../../components/cards-list/cards-list';
import { ErrorBoundary } from '../../../../components/shared/error-boundary/error-boundary';

import styles from './cards-block.module.scss';

export function CardsBlock() {
  return (
    <div className={styles.container}>
      <CardsList />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </div>
  );
}
