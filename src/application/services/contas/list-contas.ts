import { Conta } from "@/application/models";
import { http } from "@/infra/adapters/http";
import { httpErrorHandler } from "@/infra/adapters/http-error-handler";
import { KEY } from "@/infra/config/storage-keys";
import { storage } from "@/infra/store/storage";

export const listContas = async (): Promise<Conta[]> => {
	try {
		const { data } = await http.get('/contas');

		storage.remove(KEY.CONTAS);
		storage.set(KEY.CONTAS, JSON.stringify(data.response.content))

		return data.response.content;
	} catch (error: any) {
		return httpErrorHandler(error);
	}
}
