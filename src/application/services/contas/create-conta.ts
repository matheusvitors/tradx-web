import { http } from "@/infra/adapters/http";
import { AxiosError } from "axios";

export const createConta = async (nome: string) => {
	try {
		const { data } = await http.post('/contas', {nome});
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
				message = error.message;
			}
		}
		console.error(error);
		throw new Error(message);

	}
}
