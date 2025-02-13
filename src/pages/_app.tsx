import { ThemeProvider } from '@/context/theme.provider';
import type { AppProps } from 'next/app';
import { HomeProps } from '.';

import '@/styles/index.scss';

interface AppHomeProps extends AppProps {
  pageProps: HomeProps;
}

export default function App({ Component, pageProps: props }: AppHomeProps) {
  const { theme, cards } = props;
  console.log('cards: ', cards);

  return (
    <ThemeProvider theme={theme}>
      <Component pageProps={props} />
    </ThemeProvider>
  );
}
