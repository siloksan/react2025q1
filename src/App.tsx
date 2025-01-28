import { Component, StrictMode } from 'react';
import ErrorBoundary from './shared/errorBoundary/ErrorBoundary';
import Main from './pages/main/main';

import './styles/index.scss';

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
