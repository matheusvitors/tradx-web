import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import { Page } from '@/ui/layouts';
import { Operacao } from '@/application/models';
import { listOperacoes } from '@/application/services/operacoes';
import { STALE_TIME } from '@/infra/config/constants';
import { Column, DataTable, DataTablePayload, FloatingButton, PageLoading, Toast } from '@/ui/components';
import { useNavigate, useLocation } from 'react-router-dom';

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

	}

	const onRemove = async (operacao: Operacao) => {

	}

	const columns: Column<Operacao>[] = [
		{ name: 'Preço - Entrada', acessor: 'precoEntrada'},
		{ name: 'Preço - Saída', acessor: 'precoSaida'},
		{ name: 'Horário - Entrada', acessor: 'dataEntrada'},
		{ name: 'Horário - Saída', acessor: 'dataSaida'},
	]

	const preparePayloadDataTable = (input: Operacao[]): DataTablePayload[] => {
		const result: DataTablePayload[] = input.map((item: Operacao) => ({
			data: item,
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
