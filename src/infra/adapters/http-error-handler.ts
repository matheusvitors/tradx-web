import { AxiosError } from "axios";

export const httpErrorHandler = (error: any) => {
	let message = error.message;
	if(error instanceof AxiosError) {
		if(error.response){
			message = error.response.data.response.message;
		}
	}
	console.error('[HTTP-ERROR-HANDLER] => ', error);
	throw new Error(message);

}
