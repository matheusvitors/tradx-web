import { Credentials } from "@/application/interfaces";
import { http } from "@/infra/adapters/http";
import { httpErrorHandler } from "@/infra/adapters/http-error-handler";
import { KEY_TOKEN } from "@/infra/config/storage-keys";
import { storage } from "@/ui/store/storage";

export const authenticateUser = async (credentials: Credentials) => {
	try {
		const response = await http.post('/login', credentials);
		storage.set(KEY_TOKEN, response.data.response.content.token);
	} catch (error: any) {
		httpErrorHandler(error);
	}
}
