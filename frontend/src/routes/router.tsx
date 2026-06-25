import { createRouter } from '@tanstack/react-router';
import { rootRoute } from '@/routes';
import { indexRoute } from '@/pages/Home/route.tsx';
import { aboutRoute } from '@/pages/About/route.tsx';
import { contactRoute } from '@/pages/Contact/route.tsx';
import { galleryRoute } from '@/pages/Gallery/route.tsx';

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, contactRoute, galleryRoute]);

export const router = createRouter({ routeTree });