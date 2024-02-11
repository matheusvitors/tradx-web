import React from 'react';
import { Router } from '@/Router';
import { SystemThemeProvider } from '@/ui/contexts/theme-context';
import GlobalStyles from '@/ui/styles/GlobalStyles';
import { BrowserRouter } from 'react-router-dom';

export const App: React.FC = () => {
	return (
		<SystemThemeProvider>
			<GlobalStyles />
			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</SystemThemeProvider>
	);
}
