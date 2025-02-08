import { StrictMode } from 'react';
import ErrorBoundary from './components/shared/errorBoundary/ErrorBoundary';
import { RouterProvider } from 'react-router';
import routes from './routes/routes';
import { Provider } from 'react-redux';
import { store } from './store/store';

import './styles/index.scss';
import { ThemeProvider } from './context/theme.provider';

export function App() {
  return (
    <StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <ThemeProvider>
            <RouterProvider router={routes} />
          </ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </StrictMode>
  );
}
