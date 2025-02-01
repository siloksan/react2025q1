import Logo from '../../shared/logo/logo';

import styles from './header.module.scss';

export function Header() {
  return (
    <header className={styles.container}>
      <Logo className={styles.logo} />
    </header>
  );
}
