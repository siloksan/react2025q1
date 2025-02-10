import { Outlet } from 'react-router';
import { CardsList } from '../../../../components/cards-list/cards-list';
import { ErrorBoundary } from '../../../../components/shared/errorBoundary/ErrorBoundary';
import { Mock } from 'vitest';
import { render } from '@testing-library/react';
import { CardsBlock } from './cards-block';

vi.mock('react-router', () => ({
  Outlet: vi.fn(),
}));

vi.mock('../../../../components/cards-list/cards-list', () => ({
  CardsList: vi.fn(),
}));

vi.mock('../../../../components/shared/errorBoundary/ErrorBoundary', () => ({
  ErrorBoundary: vi.fn(),
}));

describe('CardsBlock', () => {
  const OutletMock = () => <div>OutletMock</div>;
  const CardsListMock = () => <div>CardsList</div>;
  const ErrorBoundaryMock = () => <div>ErrorBoundary</div>;

  beforeEach(() => {
    (Outlet as Mock).mockImplementation(OutletMock);
    (CardsList as Mock).mockImplementation(CardsListMock);
    (ErrorBoundary as Mock).mockImplementation(ErrorBoundaryMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  it('should render CardsBlock', () => {
    const { container } = render(<CardsBlock />);

    expect(container).toBeInTheDocument();
  });
});
