import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './home-page';

describe('Home component', () => {
  it('should render without crashing', () => {
    const { container } = render(<Home />);
    expect(container).toBeEmptyDOMElement();
  });
});
