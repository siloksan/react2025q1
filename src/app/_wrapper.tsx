'use client';

import { useThemeContext } from '@/context/theme-context/theme.context';
import { Header } from '@/components/header/header';

import styles from './wrapper.module.scss';

export function BodyWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeContext();

  return (
    <body
      data-theme={theme}
      className={styles.layout}
      role="button"
      tabIndex={0}
      // onClick={closeDetails}
      onKeyDown={() => {}}
      // data-testid={testid}
    >
      <Header />
      <div className={styles.main}>
        <h1 className={styles.title}>Star ships</h1>
        {/* <div ref={ref}> */}
        {/* <SearchBox /> */}
        {children}
        {/* <Flyout /> */}
        {/* </div> */}
      </div>
    </body>
  );
}
