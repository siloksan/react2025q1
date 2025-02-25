import { type PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from './store';

export default function StoreProvider({ children }: PropsWithChildren) {
  return <Provider store={makeStore()}>{children}</Provider>;
}
