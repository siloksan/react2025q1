import { Component, ComponentProps } from 'react';
import { PATH_TO_LOGO } from '../../constants';

import styles from './logo.module.scss';

interface Props extends ComponentProps<'div'> {
  pathToLogo?: string;
}

export default class Logo extends Component<Props> {
  render() {
    const { pathToLogo = PATH_TO_LOGO, className = '' } = this.props;

    return (
      <div className={`${styles.container} ${className}`}>
        <img src={pathToLogo} alt="Logo" className={styles.logo} />
      </div>
    );
  }
}
