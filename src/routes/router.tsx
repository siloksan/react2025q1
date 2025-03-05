import { createBrowserRouter } from 'react-router';
import Layout from '../components/root-layout/root-layout';
import NotFoundPage from '../components/not-found-page/not-found-page';
import { Home } from '../components/home/home';
import { ControlledForm } from '../components/controlled-form/controlled-form';
import { UncontrolledForm } from '../components/uncontrolled-form/uncontrolled-form';

export const routesConfig = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/controlled-form', element: <ControlledForm /> },
      { path: '/uncontrolled-form', element: <UncontrolledForm /> },
    ],
  },
];

const routes = createBrowserRouter(routesConfig);
export default routes;
