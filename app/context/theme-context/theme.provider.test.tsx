// import { render } from '@testing-library/react';
// import { ThemeContext } from './theme.context';
// import { Themes } from './theme.constants';
// import userEvent from '@testing-library/user-event';
// import { ThemeProvider } from './theme.provider';
// import { type Mock } from 'vitest';

// vi.mock('../hooks');

// global.fetch = vi.fn(() =>
//   Promise.resolve({
//     ok: true,
//     json: () => Promise.resolve({ success: true }),
//   })
// ) as Mock;

// describe('ThemeProvider', () => {
//   it('should provide the initial theme', () => {
//     const theme = Themes.dark;

//     const screen = render(
//       <ThemeProvider theme={theme}>
//         <ThemeContext.Consumer>
//           {(context) => context && <div>{context.theme}</div>}
//         </ThemeContext.Consumer>
//       </ThemeProvider>
//     );

//     expect(screen.getByText(theme)).toBeInTheDocument();
//   });

//   it('should toggle the theme', async () => {
//     const screen = render(
//       <ThemeProvider theme={Themes.dark}>
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

//     expect(screen.getByText(Themes.dark)).toBeInTheDocument();
//     await userEvent.click(screen.getByRole('button'));

//     expect(screen.getByText(Themes.light)).toBeInTheDocument();
//   });
// });
