import { Ativo } from "@/application/models";
import { http } from "@/infra/adapters/http";
import { httpErrorHandler } from "@/infra/adapters/http-error-handler";

export const listAtivos = async (): Promise<Ativo[]> => {
	try {
		const { data } = await http.get('/ativos');
		return data.response.content;
	} catch (error: any) {
		return httpErrorHandler(error);
	}
}
