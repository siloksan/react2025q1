import React from 'react';
import { render } from '@testing-library/react';
import { Loader, LOADER_TEST_ID } from './loader';

describe('Loader', () => {
  it('should render without crashing', () => {
    const { getByTestId } = render(<Loader />);
    const loaderElement = getByTestId(LOADER_TEST_ID);
    expect(loaderElement).toBeInTheDocument();
  });
});
