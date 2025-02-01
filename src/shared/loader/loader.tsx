import styles from './loader.module.scss';

export function Loader() {
  return (
    <div className={styles.container}>
      <span className={styles.loader} />
    </div>
  );
}
