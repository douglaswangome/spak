import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router';
import { Footer } from '@/components/Footer.tsx';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Navbar } from '@/components/Navbar.tsx';
import { createSeoHead, siteDescription, siteName } from '@/lib/seo';

export const rootRoute = createRootRoute({
	head: () => ({
		meta: createSeoHead({
			title: siteName,
			description: siteDescription,
			pathname: '/',
		}).meta,
	}),
	component: () => (
		<>
			<HeadContent/>
			<Navbar/>
			<Outlet/>
			<Footer/>
			<TanStackRouterDevtools position="bottom-right"/>
		</>
	)
});