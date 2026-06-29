import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@/routes';
import { Gallery } from '@/pages/Gallery/';
import { createSeoHead, siteName } from '@/lib/seo';

export const galleryRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/gallery',
	head: () => createSeoHead({
		title: `Gallery | ${siteName}`,
		description: 'Browse SPAK photos from training workshops, outreach events, and surgical camps across Kenya.',
		pathname: '/gallery',
	}),
	component: Gallery,
});