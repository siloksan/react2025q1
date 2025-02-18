import { render } from '@testing-library/react';
import NotFoundPage from './not-found';

describe('NotFoundPage', () => {
  it('should render NotFoundPage', () => {
    const screen = render(<NotFoundPage />);

    const h1 = screen.getByRole('heading');

    expect(h1).toBeInTheDocument();
  });
});
