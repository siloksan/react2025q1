'use client';

import { useThemeContext } from '@/context/theme-context/theme.context';
import { Header } from '@/components/header/header';
import { useQueryState } from '@/hooks';
import { BROWSER_ROUTES } from '@/api/routes';
import { MouseEventHandler, useRef } from 'react';
import { SearchBox } from '@/components/search-bar/search-box';
import { Flyout } from '@/components/flyout/flyout';

import styles from './wrapper.module.scss';

export function BodyWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeContext();
  const { redirectWithQuery } = useQueryState();
  const ref = useRef<HTMLDivElement>(null);

  const closeDetails: MouseEventHandler<HTMLDivElement> = (event) => {
    if (ref.current?.contains(event.target as Node)) {
      return;
    }

    redirectWithQuery(`${BROWSER_ROUTES.CARDS}`);
  };

  return (
    <body data-theme={theme} className={styles.layout}>
      <Header />
      <div
        className={styles.wrapper}
        role="button"
        tabIndex={0}
        onClick={closeDetails}
        onKeyDown={() => {}}
      >
        <div className={styles.main}>
          <h1 className={styles.title}>Star ships</h1>
          <div ref={ref}>
            <SearchBox />
            {children}
            <Flyout />
          </div>
        </div>
      </div>
    </body>
  );
}
