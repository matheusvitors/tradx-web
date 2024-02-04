import { Credentials } from "@/application/interfaces";
import { http } from "@/infra/adapters/http";
import { KEY_TOKEN } from "@/infra/config/storage-keys";

export const authenticateUser = async (credentials: Credentials) => {
	try {
		const response = await http.post('/login', credentials);
		console.log(response.data);

		localStorage.setItem(KEY_TOKEN, response.data.response.content.token);
	} catch (error: any) {
		throw error;
	}
}
