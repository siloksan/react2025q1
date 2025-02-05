import { render } from '@testing-library/react';
import { ComponentType } from 'react';
import { createRoutesStub } from 'react-router';

export function renderWithReactRouter(
  Component: ComponentType,
  baseRoute: string
) {
  const Stub = createRoutesStub([
    {
      path: baseRoute,
      Component,
    },
  ]);

  return (initialEntries: string) =>
    render(<Stub initialEntries={[initialEntries]} />);
}
