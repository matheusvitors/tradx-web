import axios, { InternalAxiosRequestConfig } from "axios";
import { API_URL } from "@/infra/config/environment";
import { KEY_TOKEN } from "@/infra/config/storage-keys";
import { storage } from "@/ui/store/storage";

export const httpClient = axios.create({
	baseURL: API_URL
});


httpClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
	const token = storage.get(KEY_TOKEN);

	if(!( config.url === '/login')) {
		config.headers.Authorization = token ? `Bearer ${token.data}`: '';
	}

	return config;
})



