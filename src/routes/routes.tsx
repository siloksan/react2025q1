import { createBrowserRouter } from 'react-router';
import Layout from '../layout/layout';
import NotFoundPage from '../pages/not-found/not-found';
import CardDetails from '../components/card-details/card-details';

export const CLIENT_ROUTES = {
  HOME: '/',
  SPACECRAFTS: '/spacecrafts',
  SPACECRAFTS_DETAILS: '/spacecrafts/:spacecraftId',
};

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

const routes = createBrowserRouter(routesConfig);
export default routes;
