import { AxiosError } from "axios";
import { http } from "@/infra/adapters/http";

interface EditContaParams {
	id: string;
	nome: string;
	tipo: string;
}

export const editConta = async (params: EditContaParams) => {
	try {
		const { data } = await http.put('/contas', params);
		return data.response.content;
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
