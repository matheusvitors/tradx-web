import { Ativo } from "@/application/models";
import { http } from "@/infra/adapters/http";
import { httpErrorHandler } from "@/infra/adapters/http-error-handler";

export const getAtivo = async (id: string): Promise<Ativo> => {
	try {
		const response = await http.get(`/contas/${id}`);
		return response.data.response.content;
	} catch (error: any) {
		return httpErrorHandler(error);
	}
}
