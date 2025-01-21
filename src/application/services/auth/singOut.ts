import { KEY } from "@/infra/config/storage-keys";
import { storage } from "@/infra/store/storage";

export const signOut = () => {
	storage.remove(KEY.TOKEN);
}
