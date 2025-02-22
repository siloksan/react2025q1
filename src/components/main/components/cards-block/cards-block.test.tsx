// import { Mock } from 'vitest';
// import { render } from '@testing-library/react';
// import { CardsBlock } from './cards-block';
// import { CardsList } from '@/components/cards-list/cards-list';
// import { CardDetails } from '@/components/card-details/card-details';

// vi.mock('@/components/cards-list/cards-list', () => ({
//   CardsList: vi.fn(),
// }));

// vi.mock('@/components/card-details/card-details', () => ({
//   CardDetails: vi.fn(),
// }));

// describe('CardsBlock', () => {
//   const ComponentMock = () => <div>ComponentMock</div>;

//   beforeEach(() => {
//     (CardsList as Mock).mockImplementation(ComponentMock);
//     (CardDetails as Mock).mockImplementation(ComponentMock);
//   });

//   afterEach(() => {
//     vi.clearAllMocks();
//   });
//   it('should render CardsBlock', () => {
//     const { container } = render(<CardsBlock />);

//     expect(container).toBeInTheDocument();
//   });
// });
