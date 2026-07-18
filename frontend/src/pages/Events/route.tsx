import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@/routes';
import { Events } from '@/pages/Events/';
import { createSeoHead, siteName } from '@/lib/seo';

export const eventRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/events',
	head: () => ({
		...createSeoHead({
			title: `Events | ${siteName}`,
			description: 'Explore upcoming and past events hosted by SPAK.',
			pathname: '/events',
		}),
	}),
	component: Events,
});