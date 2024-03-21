import { http } from "@/infra/adapters/http";
import { httpErrorHandler } from "@/infra/adapters/http-error-handler";

export const removeOperacao = async (id: string): Promise<void> => {
	try {
		await http.delete(`/operacoes/${id}`);
	} catch (error: any) {
		return httpErrorHandler(error);
	}
}
