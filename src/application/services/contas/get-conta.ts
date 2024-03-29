import { Conta } from "@/application/models";
import { http } from "@/infra/adapters/http"
import { httpErrorHandler } from "@/infra/adapters/http-error-handler";

export const getConta = async (id: string): Promise<Conta> => {
	try {
		const response = await http.get(`/contas/${id}`);
		return response.data.response.content;
	} catch (error: any) {
		return httpErrorHandler(error);
	}
}
