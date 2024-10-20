import { Period } from "@/application/interfaces";
import { Operacao } from "@/application/models";
import { http } from "@/infra/adapters/http";
import { httpErrorHandler } from "@/infra/adapters/http-error-handler";
import { KEY_PERIODO_ATUAL } from "@/infra/config/storage-keys";
import { storage } from "@/infra/store/storage";
import { periodToRange } from "@/utils/period-to-range";

export const listOperacaoByConta = async (contaId: string, period?: Period): Promise<Operacao[]> => {

	try {
		const range = periodToRange(period);
		const response = await http.get(`/operacoes/conta/${contaId}/range/${range.init}/${range.end}`);
		storage.set(KEY_PERIODO_ATUAL, period);
		return response.data.response.content;
	} catch (error) {
		return httpErrorHandler(error);
	}


}
