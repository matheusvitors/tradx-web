import { Conta } from "@/application/models";
import { http } from "@/infra/adapters/http";
import { httpErrorHandler } from "@/infra/adapters/http-error-handler";

export const listContas = async (): Promise<Conta[]> => {
	try {
		const { data } = await http.get('/contas');
		return data.response.content;
	} catch (error: any) {
		return httpErrorHandler(error);
	}
}
