import { AxiosError } from "axios";

export const httpErrorHandler = (error: any) => {
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
	console.error('[HTTP-ERROR-HANDLER] => ', error);
	throw new Error(message);

}
