import { Credentials } from "@/application/interfaces";
import { http } from "@/infra/adapters/http";
import { httpErrorHandler } from "@/infra/adapters/http-error-handler";
import { KEY } from "@/infra/config/storage-keys";
import { storage } from "@/infra/store/storage";

export const authenticateUser = async (credentials: Credentials) => {
	try {
		const response = await http.post('/login', credentials);
		storage.set(KEY.TOKEN, response.data.response.content.token);
	} catch (error: any) {
		httpErrorHandler(error);
	}
}
