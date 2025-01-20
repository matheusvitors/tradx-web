import { Ativo } from "@/application/models";
import { http } from "@/infra/adapters/http";
import { httpErrorHandler } from "@/infra/adapters/http-error-handler";
import { KEY } from "@/infra/config/storage-keys";
import { storage } from "@/infra/store/storage";

export const listAtivos = async (): Promise<Ativo[]> => {
	try {
		const { data } = await http.get('/ativos');
		storage.remove(KEY.ATIVOS);
		storage.set(KEY.ATIVOS, JSON.stringify(data.response.content));
		return data.response.content;
	} catch (error: any) {
		return httpErrorHandler(error);
	}
}
