import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';
import { BROWSER_ROUTES, CLIENT_ROUTES } from './service/routes';

export default [
  layout('routes/root-layout/root-layout.tsx', [
    index('routes/home-page.tsx'),
    route(
      BROWSER_ROUTES.CARD_DETAILS(':spacecraftId'),
      'routes/card-details/page.tsx'
    ),
    route(CLIENT_ROUTES.SET_THEME, 'routes/theme/theme.ts'),
  ]),
] satisfies RouteConfig;
