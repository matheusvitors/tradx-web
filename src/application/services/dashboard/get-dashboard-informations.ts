import { DashboardInformations } from "@/application/interfaces/dashboard-informations";
import { http } from "@/infra/adapters/http"
import { httpErrorHandler } from "@/infra/adapters/http-error-handler";

export const getDashboardInformations = async (contaId: string): Promise<DashboardInformations> => {
	try {
		const response = await http.get(`/dashboard/${contaId}`);
		return response.data.response.content;
	} catch (error) {
		throw httpErrorHandler(error)
	}
}
