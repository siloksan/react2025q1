// import { Mock } from 'vitest';
// import { act, render, screen } from '@testing-library/react';
// import { CardsBlock } from './cards-block';
// import { CardsList } from '@/components/cards-list/cards-list';
// import { CardDetails } from '@/components/card-details/card-details';
// import { Pagination } from '@/components/pagination/pagination';
// import { Loader } from '@/components/shared/loader/loader';
// import { getSpacecraft } from '@/app/api/spacecrafts/[spacecraftId]/get-spacecraft';
// import { DUMMY_SPACECRAFTS_RESPONSE } from '@/api/mock/mocks/dummyData/dummySpaceCraftsResponse';
// import { Suspense } from 'react';
// import { DUMMY_SPACECRAFT_DETAILS_RESPONSE } from '@/api/mock/mocks/dummyData/dummySpaceCraftDetailsResponse';

// vi.mock('@/components/cards-list/cards-list', () => ({
//   CardsList: vi.fn(),
// }));

// vi.mock('@/components/card-details/card-details', () => ({
//   CardDetails: vi.fn(),
// }));

// vi.mock('@/components/pagination/pagination', () => ({
//   Pagination: vi.fn(),
// }));

// vi.mock('@/components/shared/loader/loader', () => ({
//   Loader: vi.fn(),
// }));

// vi.mock('@/app/api/spacecrafts/[spacecraftId]/get-spacecraft', () => ({
//   getSpacecraft: vi.fn(),
// }));

// describe('CardsBlock', () => {
//   const cardsTestId = 'cardsTestId';
//   const detailsTestId = 'detailsTestId';
//   const cardsResponse = Promise.resolve(DUMMY_SPACECRAFTS_RESPONSE);
//   const Plug = () => <div>Plug</div>;
//   const CardsListMock = () => (
//     <div data-testid={cardsTestId}>{cardsTestId}</div>
//   );

//   const DetailsListMock = () => (
//     <div data-testid={detailsTestId}>{detailsTestId}</div>
//   );

//   beforeEach(() => {
//     (CardsList as Mock).mockImplementation(CardsListMock);
//     (CardDetails as Mock).mockImplementation(DetailsListMock);
//     (Pagination as Mock).mockImplementation(Plug);
//   });

//   afterEach(() => {
//     vi.clearAllMocks();
//   });

//   it('should render CardsBlock', async () => {
//     await act(async () => {
//       render(
//         <Suspense fallback={<Loader />}>
//           <CardsBlock cardsResponse={cardsResponse} />
//         </Suspense>
//       );
//       await cardsResponse;
//     });

//     expect(screen.getByTestId(cardsTestId)).toBeInTheDocument();
//   });

//   it('should render CardDetails with spacecraftResponse when spacecraftId is provided', async () => {
//     (getSpacecraft as Mock).mockReturnValue(DUMMY_SPACECRAFT_DETAILS_RESPONSE);

//     const spacecraftId = '1';

//     await act(async () => {
//       render(
//         <Suspense fallback={<Loader />}>
//           <CardsBlock
//             cardsResponse={cardsResponse}
//             spacecraftId={spacecraftId}
//           />
//         </Suspense>
//       );
//       await cardsResponse;
//     });

//     expect(getSpacecraft).toHaveBeenCalledWith(spacecraftId);
//     expect(screen.getByTestId(detailsTestId)).toBeInTheDocument();
//   });
// });
