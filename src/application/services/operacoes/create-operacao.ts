import { OperacaoDTO } from "@/application/dto/operacao-dto";
import { http } from "@/infra/adapters/http";
import { httpErrorHandler } from "@/infra/adapters/http-error-handler";

export const createOperacao = async (params: Omit<OperacaoDTO, 'id'>) => {
	try {
		const { data } = await http.post('/operacoes', params);
		return data.response.content;
	} catch (error) {
		httpErrorHandler(error)
	}

}
