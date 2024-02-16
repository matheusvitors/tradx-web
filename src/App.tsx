import React from 'react';
import { Router } from '@/Router';
import { SystemThemeProvider } from '@/ui/contexts/theme-context';
import GlobalStyles from '@/ui/styles/GlobalStyles';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const App: React.FC = () => {

	const queryClient = new QueryClient();

	return (
		<SystemThemeProvider>
			<QueryClientProvider client={queryClient}>
				<GlobalStyles />
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</QueryClientProvider>
		</SystemThemeProvider>
	);
}
