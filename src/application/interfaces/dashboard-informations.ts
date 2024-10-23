import { Operacao } from "@/application/models";

export interface DashboardInformations {
	conta: {
		saldo: string;
		ganhos: string;
		perdas: string;
	};
	variacao: {
		value: number;
		data: string;
		label: string;
	}[];
	operacoes: Operacao[]
}
