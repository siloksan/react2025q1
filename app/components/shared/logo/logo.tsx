import { type ComponentProps } from 'react';
import logo_img from './assets/logo.png';

import styles from './logo.module.scss';

export function Logo({ className = '' }: ComponentProps<'div'>) {
  return (
    <div className={`${styles.container} ${className}`}>
      <img src={logo_img} alt="Logo" className={styles.logo} />
    </div>
  );
}
