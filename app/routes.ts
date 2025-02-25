import { type RouteConfig, index, route } from '@react-router/dev/routes';
import { CLIENT_ROUTES } from './service/routes';

export default [
  index('routes/cards-block.tsx'),
  route(CLIENT_ROUTES.SET_THEME, 'routes/theme/theme.ts'),
] satisfies RouteConfig;
