import Logo from '../../shared/logo/logo';

import styles from './header.module.scss';

export const HEADER_TEST_ID = 'header_test_id';

export function Header() {
  return (
    <header className={styles.container} data-testid={HEADER_TEST_ID}>
      <Logo className={styles.logo} />
    </header>
  );
}
