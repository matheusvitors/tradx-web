import { Ativo, Conta } from "@/application/models";

export interface Operacao {
	id: string;
	ativo: Ativo;
	conta: Conta;
	quantidade: number;
	tipo: string;
	precoEntrada: number;
	stopLoss: number;
	alvo: number;
	precoSaida?: number;
	dataEntrada: Date;
	dataSaida?: Date;
	margem: number;
	operacaoPerdida: boolean;
	operacaoErrada: boolean;
	motivo?: string;
	comentarios?: string;
}
