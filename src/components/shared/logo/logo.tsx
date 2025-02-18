import { ComponentProps } from 'react';
import Image from 'next/image';
import logo_img from './assets/logo.png';

import styles from './logo.module.scss';

export function Logo({ className = '' }: ComponentProps<'div'>) {
  return (
    <div className={`${styles.container} ${className}`}>
      <Image src={logo_img} alt="Logo" className={styles.logo} />
    </div>
  );
}
