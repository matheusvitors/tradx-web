export interface Ativo {
	id: string;
	nome: string;
	acronimo: string;
	tipo: string;
	dataVencimento?: Date | null;
}
