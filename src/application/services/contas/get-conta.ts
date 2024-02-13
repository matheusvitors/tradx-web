import { Conta } from "@/application/models";
import { http } from "@/infra/adapters/http"
import { AxiosError } from "axios";

export const getConta = async (id: string): Promise<Conta> => {
	try {
		const response = await http.get(`/contas/${id}`);
		return response.data.response.content;

	} catch (error: any) {
		let message = error.message;
		if(error instanceof AxiosError) {
			if(error.response){
				message = error.response.data.response.message;
			}
		}
		console.error(error);
		throw new Error(message);
	}
}
