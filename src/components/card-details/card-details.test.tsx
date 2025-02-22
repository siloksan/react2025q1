// import { useAppSelector } from '@/store/store.hooks';
// import { useRouter } from 'next/router';
// import { BROWSER_ROUTES } from '@/api/routes';
// import { render } from '@testing-library/react';
// import { DUMMY_SPACECRAFT_DETAILS_RESPONSE } from '../../api/mock/mocks/dummyData/dummySpaceCraftDetailsResponse';
// import { Mock } from 'vitest';
// import userEvent from '@testing-library/user-event';
// import { LOADER_TEST_ID } from '../shared/loader/loader';
// import { CardDetails } from './card-details';

// vi.mock('next/router', () => ({
//   useRouter: vi.fn(),
// }));

// vi.mock('@/store/store.hooks', () => ({
//   useAppSelector: vi.fn(),
// }));

// describe('CardDetails', () => {
//   const push = vi.fn();
//   const query = {};
//   const router = { push, query };
//   const value = DUMMY_SPACECRAFT_DETAILS_RESPONSE.spacecraft;
//   const isLoading = false;

//   beforeEach(() => {
//     vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
//     (useRouter as Mock).mockReturnValue(router);
//     (useAppSelector as unknown as Mock).mockReturnValue({ value, isLoading });
//   });

//   afterEach(() => {
//     vi.clearAllMocks();
//   });

//   it('should render CardDetails and display spacecraft data', () => {
//     const screen = render(<CardDetails />);

//     expect(screen.getByText(/Name:/)).toBeInTheDocument();
//     expect(screen.getByText(/Class:/)).toBeInTheDocument();
//   });

//   it('should handle close button click', async () => {
//     const screen = render(<CardDetails />);

//     expect(screen.getByText(/Name:/)).toBeInTheDocument();

//     const user = userEvent.setup();
//     await user.click(screen.getByRole('button', { name: /Close details/i }));

//     expect(push).toHaveBeenCalledWith({
//       pathname: `${BROWSER_ROUTES.CARDS}`,
//       query: {},
//     });
//   });

//   it('should display loader when fetching data', () => {
//     const isLoading = true;
//     (useAppSelector as unknown as Mock).mockReturnValue({ value, isLoading });

//     const screen = render(<CardDetails />);

//     expect(screen.getByTestId(LOADER_TEST_ID)).toBeInTheDocument();
//   });

//   it('should not render return null when there is no data', () => {
//     const value = {
//       ...DUMMY_SPACECRAFT_DETAILS_RESPONSE.spacecraft,
//       spacecraftClass: null,
//     };
//     (useAppSelector as unknown as Mock).mockReturnValue({ value, isLoading });

//     const screen = render(<CardDetails />);

//     const classElement = screen.queryByText(/Class:/);

//     expect(classElement).not.toBeInTheDocument();
//   });

//   it('should return null when there is no data', () => {
//     const value = null;
//     (useAppSelector as unknown as Mock).mockReturnValue({ value, isLoading });

//     const screen = render(<CardDetails />);

//     expect(screen.container).toBeEmptyDOMElement();
//   });
// });
