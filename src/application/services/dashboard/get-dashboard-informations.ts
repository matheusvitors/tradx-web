import { http } from "@/infra/adapters/http"
import { httpErrorHandler } from "@/infra/adapters/http-error-handler";

export const getDashboardInformations = async (contaId: string) => {
	try {
		const response = await http.get(`/dashboard/${contaId}`);
		return response.data.response.content;
	} catch (error) {
		throw httpErrorHandler(error)
	}
}
