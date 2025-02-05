import { Component, StrictMode } from 'react';
import ErrorBoundary from './shared/errorBoundary/ErrorBoundary';
import { RouterProvider } from 'react-router';
import routes from './routes/routes';

import './styles/index.scss';

export default class App extends Component {
  render() {
    return (
      <StrictMode>
        <ErrorBoundary>
          <RouterProvider router={routes} />
        </ErrorBoundary>
      </StrictMode>
    );
  }
}
