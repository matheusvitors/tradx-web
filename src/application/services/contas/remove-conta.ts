import { http } from "@/infra/adapters/http";
import { httpErrorHandler } from "@/infra/adapters/http-error-handler";

export const removeConta = async (id: string): Promise<void> => {
	try {
		await http.delete(`/contas/${id}`);
	} catch (error: any) {
		return httpErrorHandler(error);
	}
};
