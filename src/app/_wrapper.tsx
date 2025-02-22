'use client';

import { useThemeContext } from '@/context/theme-context/theme.context';
import { Header } from '@/components/header/header';
import { useQueryState } from '@/hooks';
import { BROWSER_ROUTES } from '@/api/routes';
import { MouseEventHandler, useRef } from 'react';

import styles from './wrapper.module.scss';

export function BodyWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeContext();
  const { redirectWithQuery } = useQueryState();
  const ref = useRef<HTMLDivElement>(null);

  const closeDetails: MouseEventHandler<HTMLBodyElement> = (event) => {
    if (ref.current?.contains(event.target as Node)) {
      return;
    }

    redirectWithQuery(`${BROWSER_ROUTES.CARDS}`);
  };

  return (
    <body
      data-theme={theme}
      className={styles.layout}
      role="button"
      tabIndex={0}
      onClick={closeDetails}
      onKeyDown={() => {}}
    >
      <Header />
      <div className={styles.main}>
        <h1 className={styles.title}>Star ships</h1>
        <div ref={ref}>
          {/* <SearchBox /> */}
          {children}
          {/* <Flyout /> */}
        </div>
      </div>
    </body>
  );
}
