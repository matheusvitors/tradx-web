export interface Ativo {
	id: string;
	nome: string;
	acronimo: string;
	tipo: string;
	multiplicador: number;
	dataVencimento?: Date | null;
}
