import { jwt } from "@/infra/adapters/jwt";
import { KEY_TOKEN } from "@/infra/config/storage-keys";
import { storage } from "@/infra/store/storage";

export const isTokenExpired = (): boolean => {
	const token = storage.get(KEY_TOKEN);

	if(token) {
		if(jwt.isExpired(token)) {
			storage.remove(KEY_TOKEN);
			return true;
		}
		return false;
	}
	return true;

}
