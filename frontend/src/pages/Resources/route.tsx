import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@/routes';
import { Resources } from '@/pages/Resources';
import { createSeoHead, siteName } from '@/lib/seo';

export const resourcesRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/resources',
	head: () => ({
		...createSeoHead({
			title: `Resources | ${siteName}`,
			description: 'Access valuable resources and information from SPAK.',
			pathname: '/resources',
		}),
	}),
	component: Resources,
});