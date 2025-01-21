import { jwt } from "@/infra/adapters/jwt";
import { KEY } from "@/infra/config/storage-keys";
import { storage } from "@/infra/store/storage";

export const isTokenExpired = (): boolean => {
	const token = storage.get(KEY.TOKEN);

	if(token) {
		if(jwt.isExpired(token)) {
			storage.remove(KEY.TOKEN);
			return true;
		}
		return false;
	}
	return true;

}
