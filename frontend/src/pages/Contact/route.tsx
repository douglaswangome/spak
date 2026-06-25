import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@/routes';
import { Contact } from '@/pages/Contact/';

export const contactRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/contact',
	component: Contact,
});