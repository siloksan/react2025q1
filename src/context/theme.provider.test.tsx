// import { render } from '@testing-library/react';
// import { ThemeProvider } from './theme.provider';
// import { ThemeContext } from './theme.context';
// import { THEME_LOCALSTORAGE_KEY, Themes } from './theme.constants';
// import { useStorage } from '../hooks';
// import { Mock } from 'vitest';
// import userEvent from '@testing-library/user-event';

// vi.mock('../hooks');

// describe('ThemeProvider', () => {
//   it('should provide the initial theme from local storage', () => {
//     (useStorage as Mock).mockReturnValue({
//       getValueFromStorage: vi.fn().mockReturnValue(Themes.dark),
//     });

//     const screen = render(
//       <ThemeProvider>
//         <ThemeContext.Consumer>
//           {(context) => context && <div>{context.theme}</div>}
//         </ThemeContext.Consumer>
//       </ThemeProvider>
//     );

//     expect(screen.getByText(Themes.dark)).toBeInTheDocument();
//   });

//   it('should default to light theme if no theme is in local storage', () => {
//     (useStorage as Mock).mockReturnValue({
//       getValueFromStorage: vi.fn().mockReturnValue(null),
//     });

//     const screen = render(
//       <ThemeProvider>
//         <ThemeContext.Consumer>
//           {(context) => context && <div>{context.theme}</div>}
//         </ThemeContext.Consumer>
//       </ThemeProvider>
//     );

//     expect(screen.getByText(Themes.light)).toBeInTheDocument();
//   });

//   it('should toggle the theme and update local storage', async () => {
//     const setValueInStorageMock = vi.fn();

//     (useStorage as Mock).mockReturnValue({
//       getValueFromStorage: vi.fn().mockReturnValue(Themes.light),
//       setValueInStorage: setValueInStorageMock,
//     });

//     const screen = render(
//       <ThemeProvider>
//         <ThemeContext.Consumer>
//           {(context) =>
//             context && (
//               <div>
//                 <span>{context.theme}</span>
//                 <button onClick={context.toggleTheme}>Toggle Theme</button>
//               </div>
//             )
//           }
//         </ThemeContext.Consumer>
//       </ThemeProvider>
//     );

//     await userEvent.click(screen.getByRole('button'));

//     expect(screen.getByText(Themes.dark)).toBeInTheDocument();
//     expect(setValueInStorageMock).toHaveBeenCalledWith(
//       THEME_LOCALSTORAGE_KEY,
//       Themes.dark
//     );
//   });
// });
