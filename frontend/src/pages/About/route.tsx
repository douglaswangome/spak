import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@/routes';
import { About } from '@/pages/About';
import { createSeoHead, siteName } from '@/lib/seo';

export const aboutRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/about',
	head: () => createSeoHead({
		title: `About SPAK | ${siteName}`,
		description: 'Learn about the Society of Paediatric Anaesthesiologists of Kenya, its mission, leadership, and collaborators.',
		pathname: '/about',
	}),
	component: About,
});