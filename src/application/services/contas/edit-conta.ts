import { http } from "@/infra/adapters/http";
import { ContaDTO } from "@/application/dto";
import { httpErrorHandler } from "@/infra/adapters/http-error-handler";

export const editConta = async (params: ContaDTO) => {
	try {
		const { data } = await http.put('/contas', params);
		return data.response.content;
	} catch (error: any) {
		return httpErrorHandler(error);
	}
}
