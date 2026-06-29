import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@/routes';
import { Home } from '@/pages/Home';
import { createOrganizationSchema, createSeoHead, siteDescription } from '@/lib/seo';

export const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	head: () => ({
		...createSeoHead({
			title: `SPAK | Paediatric Anaesthesia in Kenya`,
			description: siteDescription,
			pathname: '/',
		}),
		scripts: [
			{
				type: 'application/ld+json',
				children: JSON.stringify(createOrganizationSchema({ pathname: '/' })),
			},
		],
	}),
	component: Home,
});