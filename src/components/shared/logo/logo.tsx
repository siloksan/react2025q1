import { Component, ComponentProps } from 'react';
import Image from 'next/image';
import logo_img from './assets/logo.png';

import styles from './logo.module.scss';

interface Props extends ComponentProps<'div'> {
  pathToLogo?: string;
}

export default class Logo extends Component<Props> {
  render() {
    const { pathToLogo = logo_img, className = '' } = this.props;

    return (
      <div className={`${styles.container} ${className}`}>
        <Image src={pathToLogo} alt="Logo" className={styles.logo} />
      </div>
    );
  }
}
