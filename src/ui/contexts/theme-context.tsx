import { useSystemTheme } from "@/ui/hooks/useSystemTheme";
import { light, dark } from "@/ui/styles/themes";
import { ReactNode, createContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";

interface ThemeContextProps {
	theme: string;
	setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const DEFAULT_VALUES = {
	theme: 'light',
	setTheme: () => {}
}

export const SystemThemeContext = createContext<ThemeContextProps>(DEFAULT_VALUES);

export const SystemThemeProvider: React.FC<{children: ReactNode}> = ({ children }) => {

	const [theme, setTheme] = useState('light');
	const { getTheme } = useSystemTheme();

	useEffect(() => {
		setTheme(getTheme().name);
	}, [])

	return (
		<SystemThemeContext.Provider value={{ theme, setTheme}}>
			<ThemeProvider theme={theme === 'light' ? light : dark}>
				{children}
			</ThemeProvider>
		</SystemThemeContext.Provider>
	)
}
