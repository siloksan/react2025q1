import { Header, HEADER_TEST_ID } from './header';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { Logo } from '../shared/logo/logo';
import { Mock } from 'vitest';
import { render } from '@testing-library/react';

vi.mock('../theme-toggle/theme-toggle', () => ({
  ThemeToggle: vi.fn(),
}));

vi.mock('../shared/logo/logo', () => ({
  Logo: vi.fn(),
}));

describe('Header', () => {
  const ComponentMock = () => <div>Component</div>;

  beforeEach(() => {
    (ThemeToggle as Mock).mockImplementation(ComponentMock);
    (Logo as Mock).mockImplementation(ComponentMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render header', () => {
    const screen = render(<Header />);

    const header = screen.getByTestId(HEADER_TEST_ID);

    expect(header).toBeInTheDocument();
  });
});
