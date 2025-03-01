import { type Mock } from 'vitest';
import { render } from '@testing-library/react';
import { CardsList } from '~/components/cards-list/cards-list';
import { Pagination } from '~/components/shared/pagination/pagination';
import { DUMMY_SPACECRAFTS_RESPONSE } from '~/service/mock/mocks/dummyData/dummySpaceCraftsResponse';
import RootLayout, { loader } from './root-layout';
import { FIRST_PAGE } from '~/constants/view';
import { getCards } from '~/service/handlers';

vi.mock('~/components/cards-list/cards-list', () => ({
  CardsList: vi.fn(),
}));

vi.mock('~/components/shared/pagination/pagination', () => ({
  Pagination: vi.fn(),
}));

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    Outlet: () => <div>Mocked Outlet</div>,
  };
});

describe('CardsBlock', () => {
  const cardsTestId = 'cardsTestId';
  const cardsResponse = { cardsResponse: DUMMY_SPACECRAFTS_RESPONSE };
  const Plug = () => <div>Plug</div>;
  const CardsListMock = () => (
    <div data-testid={cardsTestId}>{cardsTestId}</div>
  );

  beforeEach(() => {
    (CardsList as Mock).mockImplementation(CardsListMock);
    (Pagination as Mock).mockImplementation(Plug);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render RootLayout', () => {
    const screen = render(<RootLayout loaderData={cardsResponse} />);

    expect(screen.getByTestId(cardsTestId)).toBeInTheDocument();
  });
});

vi.mock('~/service/handlers', () => ({
  getCards: vi.fn(),
}));

describe('CardsBlock loader', () => {
  it('should call getCards with correct parameters', async () => {
    const searTerm = 'test';
    const page = 2;
    const request = new Request(
      `http://localhost?name=${searTerm}&page=${page}`
    );
    (getCards as Mock).mockResolvedValue(DUMMY_SPACECRAFTS_RESPONSE);

    await loader({ request });

    expect(getCards).toHaveBeenCalledWith({ name: 'test', page: 2 });
  });

  it('should use default values if search params are not provided', async () => {
    const request = new Request('http://localhost');
    (getCards as Mock).mockResolvedValue(DUMMY_SPACECRAFTS_RESPONSE);

    await loader({ request });

    expect(getCards).toHaveBeenCalledWith({ name: '', page: FIRST_PAGE });
  });
});
