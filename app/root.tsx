import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';
import type { Route } from './+types/root';
import StoreProvider from './store/store.provider';
import { ThemeProvider } from './context/theme-context/theme.provider';
import { Header } from './components/header/header';
import { useThemeContext } from './context/theme-context/theme.context';
import { useRef, type PropsWithChildren } from 'react';
import { getTheme } from './utils';

import styles from './root.module.scss';
import './styles/index.scss';

export async function loader({ request }: Route.LoaderArgs) {
  const theme = await getTheme(request);
  return { theme };
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon-32x32.png" />
        <Meta />
        <Links />
      </head>
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  const { theme } = loaderData;

  return (
    <>
      <ThemeProvider theme={theme}>
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </ThemeProvider>
      <ScrollRestoration />
      <Scripts />
    </>
  );
}

function ContentWrapper({ children }: PropsWithChildren) {
  const { theme } = useThemeContext();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div data-theme={theme} className={styles.layout}>
      <Header />
      <div
        className={styles.wrapper}
        role="button"
        tabIndex={0}
        // onClick={closeDetails}
        onKeyDown={() => {}}
      >
        <div className={styles.main}>
          <h1 className={styles.title}>Star ships</h1>
          <div ref={ref}>
            {/* <SearchBox /> */}
            {children}
            {/* <Flyout /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
