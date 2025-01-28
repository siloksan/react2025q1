import { Component, StrictMode } from 'react';
import ErrorBoundary from './shared/ui/errorBoundary/ErrorBoundary';

import './styles/index.scss';
import Main from './pages/main/main';

export default class App extends Component {
  render() {
    return (
      <StrictMode>
        <ErrorBoundary>
          <Main />
        </ErrorBoundary>
      </StrictMode>
    );
  }
}
