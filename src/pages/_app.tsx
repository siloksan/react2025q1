import type { AppProps } from 'next/app';
import { HomeProps } from '.';
import { ErrorBoundary } from '@/components/shared/error-boundary/error-boundary';
import { ThemeProvider } from '@/context/theme-context/theme.provider';
import { CardsProvider } from '@/context/cards-context/cards.provider';

import '@/styles/index.scss';

interface AppHomeProps extends AppProps {
  pageProps: HomeProps;
}

export default function App({ Component, pageProps: props }: AppHomeProps) {
  const { theme, cards } = props;

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CardsProvider cards={cards}>
          <Component {...props} />
        </CardsProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
