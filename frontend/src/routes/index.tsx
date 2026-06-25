import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Footer } from '@/components/Footer.tsx';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Navbar } from '@/components/Navbar.tsx';

export const rootRoute = createRootRoute({
	component: () => (
		<>
			<Navbar/>
			<Outlet/>
			<Footer/>
			<TanStackRouterDevtools position="bottom-right"/>
		</>
	)
});