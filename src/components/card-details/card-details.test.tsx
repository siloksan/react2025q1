import { render, waitFor } from '@testing-library/react';
import { useNavigate, useParams } from 'react-router';
import CardDetails from './card-details';
import { getSpacecraft } from './card-details.get-data';
import { DUMMY_SPACECRAFT_DETAILS_RESPONSE } from '../../api/mock/mocks/dummyData/dummySpaceCraftDetailsResponse';
import { URLSearchParams } from 'url';
import { useQueryState } from '../../hooks/use-query-state';
import { Mock } from 'vitest';
import userEvent from '@testing-library/user-event';

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
  const params = { spacecraftId: 'SRMA0000278282' };
  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(navigate);
    (useParams as Mock).mockReturnValue(params);
    (useQueryState as Mock).mockReturnValue({
      searchParams: new URLSearchParams(),
    });
    (getSpacecraft as Mock).mockResolvedValue(
      DUMMY_SPACECRAFT_DETAILS_RESPONSE
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render CardDetails and display spacecraft data', async () => {
    const screen = render(<CardDetails />);

    await waitFor(() => {
      expect(screen.getByText(/Name:/)).toBeInTheDocument();
    });
  });

  it('should handle close button click', async () => {
    const screen = render(<CardDetails />);

    await waitFor(() => {
      expect(screen.getByText(/Name:/)).toBeInTheDocument();
    });

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /Close details/i }));

    expect(navigate).toHaveBeenCalledOnce();
  });
});
