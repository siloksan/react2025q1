// import { Spacecraft } from '../../api/types';
// import { useAppDispatch, useAppSelector } from '@/store/store.hooks';
// import { Card } from './card';
// import { DUMMY_SPACECRAFT_DETAILS_RESPONSE } from '../../api/mock/mocks/dummyData/dummySpaceCraftDetailsResponse';
// import userEvent from '@testing-library/user-event';
// import { BROWSER_ROUTES } from '@/api/routes';
// import { usePathname } from 'next/navigation';
// import { useQueryState } from '@/hooks';
// import { render, screen } from '@testing-library/react';
// import { selectCard, removeCard } from '@/store/features';
// import { Mock } from 'vitest';

// vi.mock('next/navigation', () => ({
//   usePathname: vi.fn(),
// }));

// vi.mock('@/hooks', () => ({
//   useQueryState: vi.fn(),
// }));

// vi.mock('@/store/store.hooks', () => ({
//   useAppDispatch: vi.fn(),
//   useAppSelector: vi.fn(),
// }));

// describe('Card', () => {
//   const cardInfo =
//     DUMMY_SPACECRAFT_DETAILS_RESPONSE.spacecraft as unknown as Spacecraft;
//   const dispatch = vi.fn();
//   const redirectWithQuery = vi.fn();
//   const pathName = '';

//   beforeEach(() => {
//     (useAppDispatch as unknown as Mock).mockReturnValue(dispatch);
//     (useAppSelector as unknown as Mock).mockReturnValue([]);
//     (useQueryState as Mock).mockReturnValue({ redirectWithQuery });
//     (usePathname as Mock).mockReturnValue(pathName);
//   });

//   afterEach(() => {
//     vi.clearAllMocks();
//   });

//   it('should render li', () => {
//     render(<Card cardInfo={cardInfo} />);
//     const listitem = screen.getByRole('listitem');
//     expect(listitem).toBeInTheDocument();
//   });

//   it('should navigate to details on click', async () => {
//     render(<Card cardInfo={cardInfo} />);
//     const listitem = screen.getByRole('listitem');
//     await userEvent.click(listitem);
//     expect(redirectWithQuery).toHaveBeenCalledWith(
//       `${BROWSER_ROUTES.CARD_DETAILS(cardInfo.uid)}`
//     );
//   });

//   it('should dispatch selectCard on checkbox check', async () => {
//     render(<Card cardInfo={cardInfo} />);
//     const checkbox = screen.getByRole('checkbox');
//     await userEvent.click(checkbox);
//     expect(dispatch).toHaveBeenCalledWith(selectCard(cardInfo));
//   });

//   it('should dispatch removeCard on checkbox uncheck', async () => {
//     (useAppSelector as unknown as Mock).mockReturnValue([cardInfo]);
//     render(<Card cardInfo={cardInfo} />);
//     const checkbox = screen.getByRole('checkbox');
//     await userEvent.click(checkbox);
//     expect(dispatch).toHaveBeenCalledWith(removeCard(cardInfo.uid));
//   });

//   it('should navigate to cards on closeDetails', async () => {
//     (usePathname as Mock).mockReturnValue(cardInfo.uid);
//     render(<Card cardInfo={cardInfo} />);
//     const listitem = screen.getByRole('listitem');
//     await userEvent.click(listitem);
//     expect(redirectWithQuery).toHaveBeenCalledWith(`${BROWSER_ROUTES.CARDS}`);
//   });
// });
