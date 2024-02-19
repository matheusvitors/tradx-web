import { Ativo } from "@/application/models";
import { http } from "@/infra/adapters/http";
import { httpErrorHandler } from "@/infra/adapters/http-error-handler";

export const createAtivo = async (params: Omit<Ativo, 'id'>) => {
	try {
		const { data } = await http.post('/ativos', params);
		return data.response.content;
	} catch (error) {
		httpErrorHandler(error)
	}
}
