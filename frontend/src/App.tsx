import { router } from '@/routes/router.tsx';
import { RouterProvider } from '@tanstack/react-router';

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

export function App() {
	return (
		<RouterProvider router={router}/>
	)
}