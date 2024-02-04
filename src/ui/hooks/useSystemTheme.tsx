import { KEY_THEME } from "@/infra/config/storage-keys";
import { SystemThemeContext } from "@/ui/contexts/theme-context";
import dark from "@/ui/styles/themes/dark";
import light from "@/ui/styles/themes/light";
import { useContext } from "react";

export const useSystemTheme = () => {
	const { theme, setTheme } = useContext(SystemThemeContext);

	const changeTheme = (theme: 'light' | 'dark') => {
		setTheme(theme);
		localStorage.setItem(KEY_THEME, theme);
	}

	const getTheme = () => {
		const theme =  localStorage.getItem(KEY_THEME)
		return theme === 'light' ? light : dark;
	}

	return { theme, changeTheme, getTheme };
}
