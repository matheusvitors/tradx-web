import { Operacao } from "@/application/models";
import { http } from "@/infra/adapters/http";
import { httpErrorHandler } from "@/infra/adapters/http-error-handler";

export const listOperacoes = async (): Promise<Operacao[]> => {
	try {
		const { data } = await http.get('/operacoes');
		return data.response.content;
	} catch (error) {
		return httpErrorHandler(error);
	}
}
