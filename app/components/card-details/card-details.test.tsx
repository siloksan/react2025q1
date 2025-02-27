import { render, screen } from '@testing-library/react';
import { type Mock } from 'vitest';
import userEvent from '@testing-library/user-event';
import { CardDetails } from './card-details';
import { DUMMY_SPACECRAFT_DETAILS_RESPONSE } from '~/service/mock/mocks/dummyData/dummySpaceCraftDetailsResponse';
import { useQueryState } from '~/hooks/use-query-state';
import { BROWSER_ROUTES } from '~/service/routes';

vi.mock('~/hooks/use-query-state', () => ({
  useQueryState: vi.fn(),
}));

describe('CardDetails', () => {
  const redirectWithQuery = vi.fn();
  const { spacecraft } = DUMMY_SPACECRAFT_DETAILS_RESPONSE;

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
    (useQueryState as Mock).mockReturnValue({ redirectWithQuery });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render CardDetails and display spacecraft data', () => {
    render(<CardDetails spacecraft={spacecraft} />);

    expect(screen.getByText(/Name:/)).toBeInTheDocument();
    expect(screen.getByText(/Class:/)).toBeInTheDocument();
  });

  it('should handle close button click', async () => {
    render(<CardDetails spacecraft={spacecraft} />);

    expect(screen.getByText(/Name:/)).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /Close details/i }));

    expect(redirectWithQuery).toHaveBeenCalledWith(BROWSER_ROUTES.CARDS);
  });
});
