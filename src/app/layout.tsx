import { Metadata } from 'next';
import { Header } from '@/components/header/header';
import { PropsWithChildren } from 'react';
import { ErrorBoundary } from '@/components/shared/error-boundary/error-boundary';
import { ThemeProvider } from '@/context/theme-context/theme.provider';
import '@/styles/index.scss';
import { ServerCookieManager } from '@/utils';
import StoreProvider from '@/store/store.provider';

export const metadata: Metadata = {
  title: 'Star Trek',
  description: 'Client for Star Trek API',
  icons: {
    icon: '/favicon-32x32',
  },
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const theme = await ServerCookieManager.getTheme();

  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ThemeProvider theme={theme}>
            <Header />
            <ErrorBoundary>{children}</ErrorBoundary>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
