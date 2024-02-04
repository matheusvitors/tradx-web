import { API_URL } from "@/infra/config/environment";
import axios from "axios";

export const httpClient = axios.create({
	baseURL: API_URL
});
