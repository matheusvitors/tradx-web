import React, { useEffect, useState } from 'react';
import { Page } from '@/ui/layouts';
import styled, { useTheme } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { Ativo } from '@/application/models';
import { listAtivos, removeAtivo } from '@/application/services/ativos';
import { STALE_TIME } from '@/infra/config/constants';
import { Column, DataTable, DataTablePayload, FloatingButton, PageLoading, Toast } from '@/ui/components';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';

export const AtivosPage: React.FC = () => {

	const navigate = useNavigate();
	const location = useLocation();
	const theme = useTheme()
	const { data, isLoading, error, refetch } = useQuery<Ativo[]>({
		queryKey: ['ativos'],
		queryFn: listAtivos,
		staleTime: STALE_TIME
	});

	const [ativos, setAtivos] = useState<DataTablePayload[]>([])

	useEffect(() => {
		data && setAtivos(preparePayloadDataTable(data));
	}, [data])

	useEffect(() => {
		error && Toast.error(error.message);
	}, [error])

	const onRemoveAtivo = async (id: string) => {
		try {
			await removeAtivo(id);
		} catch (error: any) {
			Toast.error(error.message)
		}
	}

	const onEdit = (ativo: Ativo) => {
		navigate('/ativos/editar/', { state: {background: location, ativo: ativo}})
	}

	const onRemove = async (ativo: Ativo) => {
		Toast.confirm(
				'Excluir Conta?',
				`Deseja excluir o ativo [ ${ativo.nome} ]?`,
				'Excluir',
				async () => {await onRemoveAtivo(ativo.id); refetch()},
			)
		}

	const columns: Column<Ativo & { isAtivo: string; }>  [] = [
		{ name: 'Acrônimo', acessor: 'acronimo', width: '10%'},
		{ name: '', acessor: 'isAtivo', width: '10%'},
		{ name: 'Nome', acessor: 'nome'},
		{ name: 'Multiplicador', acessor: 'multiplicador'},
		{ name: 'Tipo', acessor: 'tipo'},
	]

	const preparePayloadDataTable = (input: Ativo[]): DataTablePayload[] => {
		const result: DataTablePayload[]  = input.map((item: any) => ({
			data: {...item, isAtivo: item.dataVencimento && (new Date(item.dataVencimento).getTime() <= Date.now())  ?  'Expirado' : 'Ativo' },
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
		<Page pageName='Ativos'>
			<Content>
				{/* <PageHeader>
				</PageHeader> */}
				<TableContainer>
					<DataTable columns={columns} payload={ativos} />
				</TableContainer>
				<FloatingButton
					icon={MdAdd}
					label='Novo Ativo'
					onClick={() => navigate('/ativos/adicionar', { state: {background: location}})}/>
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

// const PageHeader = styled.div`
// 	display: flex;
// 	align-items: center;
// 	justify-content: flex-start;
// 	flex-direction: row;
// 	gap: 20px;

// 	width: 100%;
// 	height: 50px;

// 	margin-bottom: 20px;
// `

const TableContainer = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-direction: column;
	flex-grow: 1;

	width: 100%;
`
