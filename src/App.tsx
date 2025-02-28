import React, { useEffect } from "react";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "@/Router";
import { SystemThemeProvider } from "@/ui/contexts/theme-context";
import GlobalStyles from "@/ui/styles/GlobalStyles";
import { SelectedContaProvider } from "@/ui/contexts/selected-conta-context";

export const App: React.FC = () => {
	const queryClient = new QueryClient();

	useEffect(() => {
		if (import.meta.env.MODE === "development") document.title = "Tradx [Development]";
		else document.title = "Tradx - Trading Management";
	}, []);

	return (
		<SystemThemeProvider>
			<QueryClientProvider client={queryClient}>
				<SelectedContaProvider>
					<GlobalStyles />
					<BrowserRouter>
						<Router />
					</BrowserRouter>
				</SelectedContaProvider>
			</QueryClientProvider>
		</SystemThemeProvider>
	);
};
