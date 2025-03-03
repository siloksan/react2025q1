import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RootProvider } from './provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootProvider />
  </StrictMode>
);
