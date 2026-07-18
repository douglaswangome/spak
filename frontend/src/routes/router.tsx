import { createRouter } from '@tanstack/react-router';
import { rootRoute } from '@/routes';
import { indexRoute } from '@/pages/Home/route.tsx';
import { aboutRoute } from '@/pages/About/route.tsx';
import { contactRoute } from '@/pages/Contact/route.tsx';
import { galleryRoute } from '@/pages/Gallery/route.tsx';
import { eventRoute } from '@/pages/Events/route.tsx';
import { resourcesRoute } from '@/pages/Resources/route.tsx';

const routeTree = rootRoute.addChildren([
	indexRoute,
	aboutRoute,
	contactRoute,
	galleryRoute,
	eventRoute,
	resourcesRoute,
]);

export const router = createRouter({ routeTree });