import { createBrowserRouter } from 'react-router';
import Layout from '../layout/layout';
import NotFoundPage from '../pages/not-found/not-found';

export const routesConfig = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    // children: [
    //   {
    //     path: '/',
    //     element: <Main />,
    //     children: [
    //       { path: 'spacecrafts/:spacecraftId', element: <CardDetails /> },
    //     ],
    //   },
    //   { path: '*', element: <NotFoundPage /> },
    // ],
  },
];

const routes = createBrowserRouter(routesConfig);
export default routes;
