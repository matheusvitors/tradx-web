import { http } from "@/infra/adapters/http";
import { httpErrorHandler } from "@/infra/adapters/http-error-handler";

export const importOperacoes = async (data: FormData): Promise<void> => {
	try {
		await http.post('/operacoes/import', data, { headers: { 'Content-Type': 'multipart/form-data'}})
	} catch (error) {
		return httpErrorHandler(error);
	}
}
