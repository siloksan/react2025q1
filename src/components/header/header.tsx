import { PureComponent } from 'react';
import Logo from '../../shared/logo/logo';
import SearchBox from '../search-bar/search-box';

import styles from './header.module.scss';

interface Props {
  updateData: (name: string) => void;
}

export class Header extends PureComponent<Props> {
  render() {
    const { updateData } = this.props;
    return (
      <header className={styles.container}>
        <Logo className={styles.logo} />
        <SearchBox updateData={updateData} className={styles.search_box} />
      </header>
    );
  }
}
