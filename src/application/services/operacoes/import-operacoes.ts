import { http } from "@/infra/adapters/http";
import { httpErrorHandler } from "@/infra/adapters/http-error-handler";

interface ImportOperacoesParams {
	data: FormData,
	contaId: string;
}

export const importOperacoes = async ({data, contaId}: ImportOperacoesParams): Promise<void> => {
	try {
		await http.post(`/operacoes/${contaId}/import`, data, { headers: { 'Content-Type': 'multipart/form-data'}})
	} catch (error) {
		return httpErrorHandler(error);
	}
}
