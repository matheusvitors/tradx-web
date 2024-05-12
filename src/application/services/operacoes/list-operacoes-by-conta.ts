import { Operacao } from "@/application/models";
import { http } from "@/infra/adapters/http";
import { httpErrorHandler } from "@/infra/adapters/http-error-handler";

export const listOperacaoByConta = async (contaId: string): Promise<Operacao[]> => {
	try {
		const { data } = await http.get(`/operacoes/conta/${contaId}`);
		return data.response.content;
	} catch (error) {
		return httpErrorHandler(error);
	}

}
