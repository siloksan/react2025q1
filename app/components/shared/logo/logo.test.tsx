import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Logo } from './logo';

describe('Logo component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Logo />);
    expect(container).toBeInTheDocument();
  });
});
