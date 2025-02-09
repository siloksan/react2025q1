import { render } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { Flyout } from './Flyout';

import { useDispatch, useSelector } from 'react-redux';
import { Mock } from 'vitest';
import { DUMMY_SPACECRAFTS_RESPONSE } from '../../api/mock/mocks/dummyData/dummySpaceCraftsResponse';
import { createCsv } from '../../utils';

vi.mock('../../utils', () => ({
  createCsv: vi.fn(),
}));

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

describe('Flyout', () => {
  const dispatch = vi.fn();
  const spacecrafts = DUMMY_SPACECRAFTS_RESPONSE.spacecrafts;
  const url = 'url';

  beforeEach(() => {
    (createCsv as Mock).mockReturnValue(url);
    (useSelector as unknown as Mock).mockReturnValue(spacecrafts);
    (useDispatch as unknown as Mock).mockReturnValue(dispatch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  it('should render Flyout', () => {
    const screen = render(<Flyout />);

    const flyout = screen.getByTestId('flyout');

    expect(flyout).toBeInTheDocument();
  });

  it('should display the correct number of selected cards', () => {
    const screen = render(<Flyout />);
    const info = screen.getByText(/The number of selected cards -/);

    expect(info).toHaveTextContent(
      `The number of selected cards - ${spacecrafts.length}`
    );
  });

  it('should call unselectAll when "Unselect all" button is clicked', async () => {
    const screen = render(<Flyout />);
    const button = screen.getByRole('button', { name: 'Unselect all' });

    await userEvent.click(button);

    expect(dispatch).toHaveBeenCalledOnce();
  });
});
