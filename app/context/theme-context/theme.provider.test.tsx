import { render } from '@testing-library/react';
import { ThemeContext } from './theme.context';
import { Themes } from './theme.constants';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from './theme.provider';
import { type Mock } from 'vitest';
import { useFetcher } from 'react-router';
import { CLIENT_ROUTES } from '~/service/routes';

vi.mock('../hooks');

vi.mock('react-router', () => ({
  useFetcher: vi.fn(),
}));

describe('ThemeProvider', () => {
  const submit = vi.fn();

  beforeEach(() => {
    (useFetcher as Mock).mockReturnValue({ submit });
  });

  it('should provide the initial theme', () => {
    const theme = Themes.dark;

    const screen = render(
      <ThemeProvider theme={theme}>
        <ThemeContext.Consumer>
          {(context) => context && <div>{context.theme}</div>}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    expect(screen.getByText(theme)).toBeInTheDocument();
  });

  it('should toggle the theme', async () => {
    const screen = render(
      <ThemeProvider theme={Themes.dark}>
        <ThemeContext.Consumer>
          {(context) =>
            context && (
              <div>
                <span>{context.theme}</span>
                <button onClick={context.toggleTheme}>Toggle Theme</button>
              </div>
            )
          }
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    expect(screen.getByText(Themes.dark)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText(Themes.light)).toBeInTheDocument();
  });

  it('should call fetcher.submit with the correct arguments when toggling theme', async () => {
    const screen = render(
      <ThemeProvider theme={Themes.dark}>
        <ThemeContext.Consumer>
          {(context) =>
            context && (
              <div>
                <span>{context.theme}</span>
                <button onClick={context.toggleTheme}>Toggle Theme</button>
              </div>
            )
          }
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    await userEvent.click(screen.getByRole('button'));

    expect(submit).toHaveBeenCalledWith(
      { theme: Themes.light },
      { method: 'POST', action: CLIENT_ROUTES.SET_THEME }
    );
  });
});
