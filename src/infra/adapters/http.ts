import { httpClient } from "@/infra/config/httpClient";
import { Response } from '@/application/interfaces'
import { AxiosRequestConfig } from "axios";

export const http = {
	get: async (endpoint: string, data?: any) => {
		return await httpClient.get<Response>(endpoint, data);
	},

	post: async (endpoint: string, data: any, options?: AxiosRequestConfig) => {
		return await httpClient.post<Response>(endpoint, data, options);
	},

	put: async (endpoint: string, data: any, options?: AxiosRequestConfig) => {
		return await httpClient.put<Response>(endpoint, data, options);
	},

	delete: async (endpoint: string, data?: any) => {
		return await httpClient.delete<Response>(endpoint, data);
	},
}
