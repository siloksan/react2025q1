import React from 'react';

import styles from './ErrorBoundary.module.scss';

export const ERROR_BOUNDARY_TEST_ID = 'error-boundary';

interface Props {
  children: React.ReactNode;
}
interface State {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
    if (errorInfo.componentStack) {
      console.error(`${error.message} in the ${errorInfo.componentStack}`);
    }
    console.error(error.message);
  }

  render() {
    const { error, errorInfo } = this.state;
    const { children } = this.props;
    if (error && errorInfo) {
      return (
        <div className={styles.container} data-testid={ERROR_BOUNDARY_TEST_ID}>
          <h2>Something went wrong!</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error.message.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
