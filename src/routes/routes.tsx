import { createBrowserRouter } from 'react-router';
import Layout from '../layout/layout';
import NotFoundPage from '../pages/not-found/not-found';
import CardDetails from '../components/card-details/card-details';
import { CLIENT_ROUTES } from './routes.constant';

export const routesConfig = [
  {
    path: CLIENT_ROUTES.HOME,
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: CLIENT_ROUTES.SPACECRAFTS_DETAILS, element: <CardDetails /> },
    ],
  },
];

export const routes = createBrowserRouter(routesConfig);
