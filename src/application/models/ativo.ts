export interface Ativo {
	id: string;
	nome: string;
	acronimo: string;
	tipo: string;
	multiplicador: string;
	dataVencimento?: Date | null;
}
