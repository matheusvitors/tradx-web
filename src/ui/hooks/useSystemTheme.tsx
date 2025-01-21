import { useContext } from "react";
import { KEY } from "@/infra/config/storage-keys";
import { storage } from "@/infra/store/storage";
import { SystemThemeContext } from "@/ui/contexts/theme-context";
import { light, dark } from "@/ui/styles/themes";

export const useSystemTheme = () => {
	const { theme, setTheme } = useContext(SystemThemeContext);

	const changeTheme = (theme: 'light' | 'dark') => {
		setTheme(theme);
		storage.set(KEY.THEME, theme);
	}

	const getTheme = () => {
		const theme =  storage.get(KEY.THEME);
		return theme && theme === 'light' ? light : dark;
	}

	return { theme, changeTheme, getTheme };
}
