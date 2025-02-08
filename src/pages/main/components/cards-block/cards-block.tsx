import { Outlet } from 'react-router';
import { CardsList } from '../../../../components/cards-list/cards-list';
import ErrorBoundary from '../../../../components/shared/errorBoundary/ErrorBoundary';
import { SpacecraftsResponse } from '../../../../api/types';

import styles from './cards-block.module.scss';

interface Props {
  readonly data: SpacecraftsResponse | null;
  readonly setData: (data: SpacecraftsResponse | null) => void;
}
export function CardsBlock({ data, setData }: Props) {
  return (
    <div className={styles.container}>
      <CardsList data={data} setData={setData} />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </div>
  );
}
