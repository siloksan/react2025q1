import { PureComponent } from 'react';
import Payload from '../../shared/api/types/apiTypes';
import Logo from '../../shared/logo/logo';

import styles from './header.module.scss';
import SearchBox from '../search-bar/search-box';

type State = object;
interface Props {
  updateData: (payload: Payload) => void;
}

export class Header extends PureComponent<Props, State> {
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
