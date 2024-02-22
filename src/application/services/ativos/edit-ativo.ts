import { Ativo } from "@/application/models";
import { http } from "@/infra/adapters/http";
import { httpErrorHandler } from "@/infra/adapters/http-error-handler";

export const editAtivo = async (params: Ativo) => {
	try {
		const { data } = await http.put('/ativos', params);
		return data.response.content;
	} catch (error: any) {
		return httpErrorHandler(error);
	}
}
