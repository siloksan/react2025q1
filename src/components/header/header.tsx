import Logo from '../../shared/logo/logo';
import { SearchBox } from '../search-bar/search-box';

import styles from './header.module.scss';

export function Header() {
  return (
    <header className={styles.container}>
      <Logo className={styles.logo} />
      <SearchBox className={styles.search_box} />
    </header>
  );
}
