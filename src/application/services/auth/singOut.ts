import { KEY_TOKEN } from "@/infra/config/storage-keys";

export const signOut = () => {
	localStorage.removeItem(KEY_TOKEN);
}
