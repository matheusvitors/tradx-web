import { httpClient } from "@/infra/config/httpClient";

export const http = {
	get: async (endpoint: string, data?: any) => {
		return await httpClient.get<Response>(endpoint, data);
	},

	post: async (endpoint: string, data: any) => {
		return await httpClient.post<Response>(endpoint, data);
	},

	put: async (endpoint: string, data: any) => {
		return await httpClient.put<Response>(endpoint, data);
	},

	delete: async (endpoint: string, data?: any) => {
		return await httpClient.delete<Response>(endpoint, data);
	},
}
