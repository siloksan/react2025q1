import { createBrowserRouter } from 'react-router';
import Layout from '../components/root-layout/root-layout';

export const routesConfig = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>Not found</div>,
    children: [
      { path: '/', element: <div>Home</div> },
      { path: '/controlled-form', element: <div>ControlledForm</div> },
      { path: '/uncontrolled-form', element: <div>ControlledForm</div> },
    ],
  },
];

const routes = createBrowserRouter(routesConfig);
export default routes;
