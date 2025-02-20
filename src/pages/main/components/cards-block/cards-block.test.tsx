import { Outlet } from 'react-router';
import { CardsList } from '../../../../components/cards-list/cards-list';
import { Mock } from 'vitest';
import { render } from '@testing-library/react';
import { CardsBlock } from './cards-block';

vi.mock('react-router', () => ({
  Outlet: vi.fn(),
}));

vi.mock('../../../../components/cards-list/cards-list', () => ({
  CardsList: vi.fn(),
}));

describe('CardsBlock', () => {
  const OutletMock = () => <div>OutletMock</div>;
  const CardsListMock = () => <div>CardsList</div>;

  beforeEach(() => {
    (Outlet as Mock).mockImplementation(OutletMock);
    (CardsList as Mock).mockImplementation(CardsListMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  it('should render CardsBlock', () => {
    const { container } = render(<CardsBlock />);

    expect(container).toBeInTheDocument();
  });
});
