import styles from './loader.module.scss';

export const LOADER_TEST_ID = 'loader';

export function Loader() {
  return (
    <div className={styles.container} data-testid={LOADER_TEST_ID}>
      <span className={styles.loader} />
    </div>
  );
}
