import { createBrowserRouter } from 'react-router';

export const routesConfig = [
  {
    path: '/',
    element: <div>Layout</div>,
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
