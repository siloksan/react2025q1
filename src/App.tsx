import { StrictMode } from 'react';
import ErrorBoundary from './components/shared/errorBoundary/ErrorBoundary';
import { RouterProvider } from 'react-router';
import routes from './routes/routes';
import { Provider } from 'react-redux';
import { store } from './store/store';

import './styles/index.scss';

export function App() {
  return (
    <StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <RouterProvider router={routes} />
        </Provider>
      </ErrorBoundary>
    </StrictMode>
  );
}
