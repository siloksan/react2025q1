'use client';
import { PropsWithChildren, useRef } from 'react';
import { Provider } from 'react-redux';
import { AppStore } from './store.types';
import { makeStore } from './store';

export default function StoreProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
