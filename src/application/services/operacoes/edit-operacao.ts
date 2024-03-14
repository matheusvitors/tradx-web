import { OperacaoDTO } from "@/application/dto/operacao-dto";
import { http } from "@/infra/adapters/http";
import { httpErrorHandler } from "@/infra/adapters/http-error-handler";

export const editOpercao = async (params: OperacaoDTO) => {
	try {
		const { data } = await http.put('/operacoes', params);
		return data.response.content;
	} catch (error: any) {
		return httpErrorHandler(error);
	}
}
