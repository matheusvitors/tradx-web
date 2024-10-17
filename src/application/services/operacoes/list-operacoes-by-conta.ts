import { format } from "date-fns";
import { Period } from "@/application/interfaces";
import { Operacao } from "@/application/models";
import { http } from "@/infra/adapters/http";
import { httpErrorHandler } from "@/infra/adapters/http-error-handler";

interface RangeData {
	init: string;
	end: string;
}

export const listOperacaoByConta = async (contaId: string, period?: Period): Promise<Operacao[]> => {
	console.log(period);

	const range: RangeData = { init: '', end: '' };
	let endDate = new Date();

	if(period) {
		if(!period.month && period.year) {
			range.init = format(new Date(`${period?.year}-01-01`), 'yyyy-MM-dd');
			endDate = new Date(`${period?.year}-12-31`);
		} else {
			range.init = format(new Date(`${period?.year}-${period?.month}-01`), 'yyyy-MM-dd');
			endDate = new Date(`${period?.year}-${period.month}-01`);
		}

		endDate.setMonth(endDate.getMonth() + 1);
		console.log({endDate});
		endDate.setDate(0);

		range.end = format(endDate, 'yyyy-MM-dd');
	} else {
		range.init = format(new Date().setDate(1), 'yyyy-MM-dd');

		const endDate = new Date();
		endDate.setMonth(endDate.getMonth() + 1);
		endDate.setDate(32);
		range.end = format(endDate, 'yyyy-MM-dd');
	}

	console.log('range', `${range.init}/${range.end}`);


	try {
		const response = await http.get(`/operacoes/conta/${contaId}/range/${range.init}/${range.end}`);
		return response.data.response.content;
	} catch (error) {
		return httpErrorHandler(error);
	}

}
