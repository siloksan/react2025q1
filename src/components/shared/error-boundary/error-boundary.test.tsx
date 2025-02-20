import { render } from '@testing-library/react';
import { ERROR_BOUNDARY_TEST_ID, ErrorBoundary } from './error-boundary';

describe('ErrorBoundary', () => {
  it('should render children when there is no error', () => {
    const content = 'test';
    const Child = () => <div>{content}</div>;
    const screen = render(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    );

    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it('should render error fallback when there is an error', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('test');
    const ThrowError = () => {
      throw error;
    };

    const screen = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByTestId(ERROR_BOUNDARY_TEST_ID)).toBeInTheDocument();
  });
});
