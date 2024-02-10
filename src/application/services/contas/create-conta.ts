import { http } from "@/infra/adapters/http";
import { AxiosError } from "axios";

interface CreateContaParams {
	nome: string;
	tipo: string;
}

export const createConta = async ({ nome, tipo }: CreateContaParams) => {
	try {
		const { data } = await http.post('/contas', {nome, tipo});
		return data.response.content;
	} catch (error: any) {
		let message = error.message;
		if(error instanceof AxiosError) {
			if(error.response){
				// if(error.response.status === 422) {
				// 	message = error.message;
				// }

				// if(error.response.status === 404) {
				// 	message = 'Usuário não foi encontrado.';
				// }
				message = error.response.data.response.message;
			}
		}
		console.error(error);
		throw new Error(message);

	}
}
