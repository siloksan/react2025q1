import { Outlet } from 'react-router';
import styles from './root-layout.module.scss';
import Header from '../header/header';

export default function Layout() {
  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
