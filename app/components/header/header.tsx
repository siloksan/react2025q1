import type { WithTestId } from '~/types';
import { Logo } from '../shared/logo/logo';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

import styles from './header.module.scss';

export function Header({ testid }: WithTestId) {
  return (
    <header className={styles.container} data-testid={testid}>
      <Logo className={styles.logo} />
      <ThemeToggle />
    </header>
  );
}
