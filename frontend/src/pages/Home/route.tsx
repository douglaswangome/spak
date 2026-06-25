import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@/routes';
import { Home } from '@/pages/Home';

export const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	component: Home,
});