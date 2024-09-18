import { http } from "@/infra/adapters/http"

export const getDashboardInformations = async () => {
	try {
		const response = await http.get('/dashboard');
		return response.data.response.content;
	} catch (error) {

	}
}
