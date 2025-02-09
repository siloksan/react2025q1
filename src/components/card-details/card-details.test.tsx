import { render } from '@testing-library/react';
import { useNavigate, useParams } from 'react-router';
import CardDetails from './card-details';
import { DUMMY_SPACECRAFT_DETAILS_RESPONSE } from '../../api/mock/mocks/dummyData/dummySpaceCraftDetailsResponse';
import { URLSearchParams } from 'url';
import { useQueryState } from '../../hooks/use-query-state';
import { Mock } from 'vitest';
import userEvent from '@testing-library/user-event';
import { useGetCardDetailsQuery } from '../../api/api-root';
import { LOADER_TEST_ID } from '../shared/loader/loader';

vi.mock('../../api/api-root', () => ({
  useGetCardDetailsQuery: vi.fn(),
}));

vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock('../../hooks/use-query-state', () => ({
  useQueryState: vi.fn(),
}));

vi.mock('./card-details.get-data', () => ({
  getSpacecraft: vi.fn(),
}));

describe('CardDetails', () => {
  const navigate = vi.fn();
  const params = {
    spacecraftId: DUMMY_SPACECRAFT_DETAILS_RESPONSE.spacecraft.uid,
  };
  const data = DUMMY_SPACECRAFT_DETAILS_RESPONSE;
  const errorMsg = 'Test Error';
  const error = new Error(errorMsg);
  const isFetching = false;
  const isError = false;

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(navigate);
    (useParams as Mock).mockReturnValue(params);
    (useQueryState as Mock).mockReturnValue({
      searchParams: new URLSearchParams(),
    });
    (useGetCardDetailsQuery as Mock).mockReturnValue({
      data,
      isFetching,
      isError,
      error,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render CardDetails and display spacecraft data', () => {
    const screen = render(<CardDetails />);

    expect(screen.getByText(/Name:/)).toBeInTheDocument();
    expect(screen.getByText(/Class:/)).toBeInTheDocument();
  });

  it('should handle close button click', async () => {
    const screen = render(<CardDetails />);

    expect(screen.getByText(/Name:/)).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /Close details/i }));

    expect(navigate).toHaveBeenCalledOnce();
  });

  it('should handle close button click', async () => {
    const screen = render(<CardDetails />);

    expect(screen.getByText(/Name:/)).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /Close details/i }));

    expect(navigate).toHaveBeenCalledOnce();
  });

  it('should display loader when fetching data', () => {
    (useGetCardDetailsQuery as Mock).mockReturnValue({
      data: null,
      isFetching: true,
      isError: false,
      error: null,
    });

    const screen = render(<CardDetails />);

    expect(screen.getByTestId(LOADER_TEST_ID)).toBeInTheDocument();
  });

  it('should throw error when there is an error', () => {
    (useGetCardDetailsQuery as Mock).mockReturnValue({
      data: null,
      isFetching: false,
      isError: true,
      error,
    });

    expect(() => render(<CardDetails />)).toThrow(errorMsg);
  });

  it('should return null when there is no data', () => {
    (useGetCardDetailsQuery as Mock).mockReturnValue({
      data: null,
      isFetching: false,
      isError: false,
      error: null,
    });

    const screen = render(<CardDetails />);

    expect(screen.container).toBeEmptyDOMElement();
  });
});
