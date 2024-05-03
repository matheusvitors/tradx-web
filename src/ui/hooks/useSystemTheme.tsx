import { KEY_THEME } from "@/infra/config/storage-keys";
import { storage } from "@/infra/store/storage";
import { SystemThemeContext } from "@/ui/contexts/theme-context";
import dark from "@/ui/styles/themes/dark";
import light from "@/ui/styles/themes/light";
import { useContext } from "react";

export const useSystemTheme = () => {
	const { theme, setTheme } = useContext(SystemThemeContext);

	const changeTheme = (theme: 'light' | 'dark') => {
		setTheme(theme);
		storage.set(KEY_THEME, theme);
	}

	const getTheme = () => {
		const theme =  storage.get(KEY_THEME);
		console.log(theme);

		return theme && theme.data === 'light' ? light : dark;
	}

	return { theme, changeTheme, getTheme };
}
