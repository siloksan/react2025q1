import { render } from '@testing-library/react';
import { ComponentType } from 'react';
import { createRoutesStub } from 'react-router';

export function renderWithReactRouter<T extends Record<string, unknown>>(
  Component: ComponentType<T>,
  baseRoute: string,
  props: T = {} as T // Принимаем props как аргумент
) {
  const Stub = createRoutesStub([
    {
      path: baseRoute,
      Component: () => (
        <Component {...props} /> // Передаем props в компонент
      ),
    },
  ]);

  return (initialEntries: string) =>
    render(<Stub initialEntries={[initialEntries]} />);
}
