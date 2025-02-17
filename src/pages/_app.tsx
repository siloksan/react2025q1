import type { AppProps } from 'next/app';
import { ErrorBoundary } from '@/components/shared/error-boundary/error-boundary';
import { ThemeProvider } from '@/context/theme-context/theme.provider';
import { Provider } from 'react-redux';
import { wrapper } from '@/store/store';

import '@/styles/index.scss';
import { HomeProps } from '.';

export default function App({ Component, ...appProps }: AppProps<HomeProps>) {
  const wrappedStore = wrapper.useWrappedStore(appProps);
  const props: HomeProps = wrappedStore.props;
  const { theme } = props;

  return (
    <ErrorBoundary>
      <Provider store={wrappedStore.store}>
        <ThemeProvider theme={theme}>
          <Component {...props} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
