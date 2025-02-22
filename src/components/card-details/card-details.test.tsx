import { BROWSER_ROUTES } from '@/api/routes';
import { act, render, screen } from '@testing-library/react';
import { DUMMY_SPACECRAFT_DETAILS_RESPONSE } from '../../api/mock/mocks/dummyData/dummySpaceCraftDetailsResponse';
import { Mock } from 'vitest';
import userEvent from '@testing-library/user-event';
import { CardDetails } from './card-details';
import { useQueryState } from '@/hooks';

vi.mock('@/hooks', () => ({
  useQueryState: vi.fn(),
}));

describe('CardDetails', () => {
  const redirectWithQuery = vi.fn();
  const spacecraftResponse = Promise.resolve(DUMMY_SPACECRAFT_DETAILS_RESPONSE);

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
    (useQueryState as unknown as Mock).mockReturnValue({ redirectWithQuery });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render CardDetails and display spacecraft data', async () => {
    await act(async () => {
      render(<CardDetails spacecraftResponse={spacecraftResponse} />);

      await spacecraftResponse;
    });

    expect(screen.getByText(/Name:/)).toBeInTheDocument();
    expect(screen.getByText(/Class:/)).toBeInTheDocument();
  });

  it('should handle close button click', async () => {
    await act(async () => {
      render(<CardDetails spacecraftResponse={spacecraftResponse} />);

      await spacecraftResponse;
    });

    expect(screen.getByText(/Name:/)).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /Close details/i }));

    expect(redirectWithQuery).toHaveBeenCalledWith(BROWSER_ROUTES.CARDS);
  });

  it('should not render return null when there is no data', async () => {
    await act(async () => {
      render(<CardDetails spacecraftResponse={null} />);
    });

    const classElement = screen.queryByText(/Class:/);

    expect(classElement).not.toBeInTheDocument();
  });
});
