import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import router from './routes/router';
import { store } from './store/store';

export function RootProvider() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />;
    </Provider>
  );
}
