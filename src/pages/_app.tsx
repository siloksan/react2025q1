import type { AppProps } from 'next/app';
import { ErrorBoundary } from '@/components/shared/error-boundary/error-boundary';
import { ThemeProvider } from '@/context/theme-context/theme.provider';
import { Provider } from 'react-redux';
import { wrapper } from '@/store/store';
import { HomeProps } from '.';

import '@/styles/index.scss';

export default function App({ Component, pageProps }: AppProps<HomeProps>) {
  const { store } = wrapper.useWrappedStore(pageProps);
  const { theme } = pageProps;

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
