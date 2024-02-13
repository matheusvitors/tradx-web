import { http } from "@/infra/adapters/http"
import { AxiosError } from "axios";

export const removeConta = async (id: string): Promise<void> => {
	try {
		await http.delete(`/contas/${id}`);
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
