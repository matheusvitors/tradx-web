import { ContaDTO } from "@/application/dto";
import { http } from "@/infra/adapters/http";
import { httpErrorHandler } from "@/infra/adapters/http-error-handler";

export const createConta = async (params: Omit<ContaDTO, 'id'>) => {
	try {
		const { data } = await http.post('/contas', params);
		return data.response.content;
	} catch (error) {
		httpErrorHandler(error)
	}
}
