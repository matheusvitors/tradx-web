import React from 'react';
import { Router } from '@/Router';
import { SystemThemeProvider } from '@/ui/contexts/theme-context';
import GlobalStyles from '@/ui/styles/GlobalStyles';

export const App: React.FC = () => {
	return (
		<SystemThemeProvider>
			<GlobalStyles />
			<Router />
		</SystemThemeProvider>
	);
}
