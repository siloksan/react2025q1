import { render, screen } from '@testing-library/react';
import { type Mock } from 'vitest';
import { useThemeContext } from './context/theme-context/theme.context';
import { useQueryState } from './hooks/use-query-state';
import userEvent from '@testing-library/user-event';
import { BROWSER_ROUTES } from './service/routes';
import { ContentWrapper, ErrorBoundary, loader } from './root';
import { getTheme } from './utils';

vi.mock('./context/theme-context/theme.context', () => ({
  useThemeContext: vi.fn(),
}));

vi.mock('./hooks/use-query-state', () => ({
  useQueryState: vi.fn(),
}));

vi.mock('./components/header/header', () => ({
  Header: () => <div>Header</div>,
}));

vi.mock('./components/search-bar/search-box', () => ({
  SearchBox: () => <div>SearchBox</div>,
}));

vi.mock('./components/flyout/flyout', () => ({
  Flyout: () => <div>Flyout</div>,
}));

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    isRouteErrorResponse: vi.fn().mockReturnValue(true),
  };
});

describe('ContentWrapper', () => {
  const redirectWithQuery = vi.fn();

  beforeEach(() => {
    (useThemeContext as Mock).mockReturnValue({ theme: 'light' });
    (useQueryState as Mock).mockReturnValue({ redirectWithQuery });
  });

  it('renders children correctly', () => {
    render(
      <ContentWrapper>
        <div>Test Child</div>
      </ContentWrapper>
    );

    expect(screen.getByText('Star ships')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('SearchBox')).toBeInTheDocument();
    expect(screen.getByText('Flyout')).toBeInTheDocument();
  });

  it('calls redirectWithQuery when clicking outside the ref element', async () => {
    render(
      <ContentWrapper>
        <div>Test Child</div>
      </ContentWrapper>
    );

    await userEvent.click(screen.getByRole('button'));

    expect(redirectWithQuery).toHaveBeenCalledWith(BROWSER_ROUTES.CARDS);
  });
});

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
  });

  it('renders default error message', () => {
    render(<ErrorBoundary error={new Error('Test error')} />);

    expect(screen.getByRole('heading', { name: 'Error' })).toBeInTheDocument();
  });

  it('renders 404 error message', () => {
    const error = { status: 404, statusText: 'Not Found' };
    render(<ErrorBoundary error={error} />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(
      screen.getByText('The requested page could not be found.')
    ).toBeInTheDocument();
  });
});

vi.mock('./utils', () => ({
  getTheme: vi.fn(),
}));

describe('Root loader', () => {
  it('should get them', async () => {
    const request = new Request('http://localhost');

    await loader({ request });

    expect(getTheme).toHaveBeenCalledWith(request);
  });
});
