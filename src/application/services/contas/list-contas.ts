import { Conta } from "@/application/models";
import { http } from "@/infra/adapters/http";

export const listContas = async (): Promise<Conta[]> => {
	try {
		const { data } = await http.get('/contas');
		return data.response.content;
	} catch (error) {
		throw error;
	}
}
