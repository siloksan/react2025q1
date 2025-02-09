import { Mock } from 'vitest';
import { ThemeToggle } from './theme-toggle';
import { Themes } from '../../context/theme.constants';
import { useThemeContext } from '../../context/theme.context';
import { render } from '@testing-library/react';

vi.mock('../../context/theme.context');

describe('ThemeToggle', () => {
  const TESTID = 'testid';
  (useThemeContext as Mock).mockReturnValue({
    theme: Themes.light,
    toggleTheme: vi.fn(),
  });
  it('should render the toggle switch', () => {
    const screen = render(<ThemeToggle testid={TESTID} />);

    expect(screen.getByTestId(TESTID)).toBeInTheDocument();
  });

  it('should be checked when theme is dark', () => {
    (useThemeContext as Mock).mockReturnValue({
      theme: Themes.dark,
      toggleTheme: vi.fn(),
    });

    const screen = render(<ThemeToggle />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeChecked();
  });
});
