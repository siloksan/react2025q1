import { ThemeProvider } from '~/context/theme-context/theme.provider';
import { ThemeToggle } from './theme-toggle';
import { render } from '@testing-library/react';
import { Themes } from '~/context/theme-context/theme.constants';
import { useFetcher } from 'react-router';
import type { Mock } from 'vitest';

vi.mock('react-router', () => ({
  useFetcher: vi.fn(),
}));

describe('ThemeToggle', () => {
  const TESTID = 'testid';
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
    (useFetcher as Mock).mockReturnValue(vi.fn());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the toggle switch', () => {
    const screen = render(
      <ThemeProvider theme={Themes.light}>
        <ThemeToggle testid={TESTID} />
      </ThemeProvider>
    );

    expect(screen.getByTestId(TESTID)).toBeInTheDocument();
  });
});
