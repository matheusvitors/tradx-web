import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';
import { Page } from '@/ui/layouts';
import { Operacao } from '@/application/models';
import { listOperacoes, removeOperacao } from '@/application/services/operacoes';
import { STALE_TIME } from '@/infra/config/constants';
import { Column, DataTable, DataTablePayload, FloatingButton, PageLoading, Toast } from '@/ui/components';

export const OperacoesPage: React.FC = () => {

	const theme = useTheme();
	const navigate = useNavigate();
	const location = useLocation();
	const { data, isLoading, error, refetch } = useQuery<Operacao[]>({
		queryKey: ['operacoes'],
		queryFn: listOperacoes,
		staleTime: STALE_TIME
	});

	const [operacoes, setOperacoes] = useState<DataTablePayload[]>([]);

	useEffect(() => {
		data && setOperacoes(preparePayloadDataTable(data));
	}, [data]);

	useEffect(() => {
		error && Toast.error(error.message);
	}, [error]);

	const onEdit = async (operacao: Operacao) => {
		navigate('/operacoes/editar', { state: {background: location, operacao: operacao }})
	}

	const onRemove = async (operacao: Operacao) => {
		Toast.confirm(
			`Excluir Operação?`,
			`Deseja excluir a operação iniciada em ${formatData(operacao.dataEntrada)}?`,
			'Excluir',
			async () => {await onRemoveOperacao(operacao.id); refetch()},
		)
	}

	const onRemoveOperacao = async (id: string) => {
		try {
			await removeOperacao(id)
		} catch (error: any) {
			Toast.error(error.message);
		}
	}

	const columns: Column<Operacao>[] = [
		{ name: 'Ativo', acessor: 'ativo.acronimo'},
		{ name: 'Tipo', acessor: 'tipo'},
		{ name: 'Preço - Entrada', acessor: 'precoEntrada'},
		{ name: 'Stop Loss', acessor: 'stopLoss'},
		{ name: 'Alvo', acessor: 'alvo'},
		{ name: 'Preço - Saída', acessor: 'precoSaida'},
		{ name: 'Horário - Entrada', acessor: 'dataEntrada'},
		{ name: 'Horário - Saída', acessor: 'dataSaida'},
	]

	const formatData = (date: Date): string => {
		return new Date(date).toLocaleString('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute:'2-digit'})
	}

	const preparePayloadDataTable = (input: Operacao[]): DataTablePayload[] => {
		const result: DataTablePayload[] = input.map((item: Operacao) => ({
			data: {
				...item,
				dataEntrada: new Date(item.dataEntrada).toLocaleString('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute:'2-digit'}),
				dataSaida: item.dataSaida ? new Date(item.dataSaida).toLocaleString('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute:'2-digit'}) : undefined,
			},
			actions: [
				{
					icon: MdEdit,
					callback: () => onEdit(item),
					color: theme.semantic.attention
				},
				{
					icon: MdDelete,
					callback: () => onRemove(item),
					color: theme.semantic.warning
				},

			]
		}))

		return result;
	}

	return (
		<Page pageName='Operações'>
			<Content>
					{data && data.length > 0 ? (
						<>
							<TableContainer>
								<PageHeader>
								</PageHeader>
								<DataTable columns={columns} payload={operacoes} />
							</TableContainer>
						</>) :
						<EmptyContainer>
							<span>Não há operações registradas.</span>
						</EmptyContainer>
					}
				<FloatingButton
					icon={MdAdd}
					label='Nova Operação'
					onClick={() => navigate('/operacoes/adicionar', { state: {background: location}})}
				/>
				<PageLoading visible={isLoading} />
			</Content>
		</Page>
	);
}

const Content = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-direction: column;
	flex-grow: 1;
`

const PageHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: row;
	gap: 20px;

	width: 100%;
	height: 50px;

	margin-bottom: 20px;
`

const TableContainer = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-direction: column;
	flex-grow: 1;

	width: 100%;

`

const EmptyContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-grow: 1;

	width: 100%;

`
