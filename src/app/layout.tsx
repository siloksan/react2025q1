import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { ErrorBoundary } from '@/components/shared/error-boundary/error-boundary';
import { ThemeProvider } from '@/context/theme-context/theme.provider';
import { ServerCookieManager } from '@/utils';
import StoreProvider from '@/store/store.provider';
import { BodyWrapper } from './_wrapper';

import '@/styles/index.scss';

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
      <StoreProvider>
        <ThemeProvider theme={theme}>
          <ErrorBoundary>
            <BodyWrapper>{children}</BodyWrapper>
          </ErrorBoundary>
        </ThemeProvider>
      </StoreProvider>
    </html>
  );
}
