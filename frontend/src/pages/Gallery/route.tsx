import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@/routes';
import { Gallery } from '@/pages/Gallery/';

export const galleryRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/gallery',
	component: Gallery,
});