import { format } from "date-fns";
import { Period, RangeData } from "@/application/interfaces";
import { Operacao } from "@/application/models";
import { http } from "@/infra/adapters/http";
import { httpErrorHandler } from "@/infra/adapters/http-error-handler";
import { periodToRange } from "@/utils/period-to-range";


export const listOperacaoByConta = async (contaId: string, period?: Period): Promise<Operacao[]> => {
	console.clear()
	console.log('period', period);

	const range = periodToRange(period);

	console.log('range', range);


	// try {
	// 	const response = await http.get(`/operacoes/conta/${contaId}/range/${range.init}/${range.end}`);
	// 	return response.data.response.content;
	// } catch (error) {
	// 	return httpErrorHandler(error);
	// }

	return [];

}
