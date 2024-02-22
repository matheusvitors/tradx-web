import { http } from "@/infra/adapters/http";
import { httpErrorHandler } from "@/infra/adapters/http-error-handler";

export const removeAtivo = async (id: string): Promise<void> => {
	try {
		await http.delete(`/ativos/${id}`);
	} catch (error: any) {
		return httpErrorHandler(error);
	}
};
