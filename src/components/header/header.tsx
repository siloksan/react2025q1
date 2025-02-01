import Logo from '../../shared/logo/logo';
import { SearchBox } from '../search-bar/search-box';

import styles from './header.module.scss';

interface Props {
  readonly updateData: (name: string) => void;
}

export function Header({ updateData }: Props) {
  return (
    <header className={styles.container}>
      <Logo className={styles.logo} />
      <SearchBox updateData={updateData} className={styles.search_box} />
    </header>
  );
}
