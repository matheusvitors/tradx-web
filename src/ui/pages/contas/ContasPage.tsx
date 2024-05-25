import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { Conta } from "@/application/models";
import { Page } from "@/ui/layouts";
import { Column, DataTable, DataTablePayload, FloatingButton, PageLoading, Toast } from "@/ui/components";
import { listContas, removeConta } from "@/application/services/contas";
import { STALE_TIME } from "@/infra/config/constants";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";

export const ContasPage: React.FC = () => {

	const navigate = useNavigate();
	const location = useLocation();
	const theme = useTheme()
	const { data, isLoading, error, refetch } = useQuery<Conta[]>({
		queryKey: ['contas'],
		queryFn: listContas,
		staleTime: STALE_TIME
	})

	const [contas, setContas] = useState<DataTablePayload[]>([]);

	useEffect(() => {
		data && setContas(preparePayloadDataTable(data));
	}, [data])

	useEffect(() => {
		error && Toast.error(error.message);
	}, [error])

	const onEdit = (conta: Conta) => {
		navigate('/contas/editar', { state: {background: location, conta }})
	}

	const onRemove = async (conta: Conta) => {
		Toast.confirm(
			'Excluir Conta?',
			`Deseja excluir a conta [ ${conta.nome} ]?`,
			'Excluir',
			async () => {await onRemoveConta(conta.id); refetch()},
		)
	}

	const onRemoveConta = async (id: string) => {
		try {
			await removeConta(id)
		} catch (error: any) {
			Toast.error(error.message);
		}
	}

	const columns: Column<Conta & { isAtivo: string; }>  [] = [
		{ name: 'Nome', acessor: 'nome'},
		{ name: 'Tipo', acessor: 'tipo'},
		{ name: 'Saldo Inicial', acessor: 'saldoInicial'},
		{ name: 'Saldo Atual', acessor: 'saldo'},
	]

	const preparePayloadDataTable = (input: Conta[]): DataTablePayload[] => {
		const result: DataTablePayload[]  = input.map((item: any) => ({
			data: {...item},
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
		<Page pageName="Contas">
			<Content>
				{/* <ContasContainer> */}
					{contas && contas.length > 0 ? (
						<DataTable columns={columns} payload={contas} />
					) : (
						<EmptyContainer>
							<span>Não há contas cadastradas.</span>
						</EmptyContainer>
					)}

					<FloatingButton
						icon={MdAdd}
						label='Nova Conta'
						onClick={() => navigate('/contas/adicionar', { state: {background: location}})}
					/>
				{/* </ContasContainer> */}
				<PageLoading visible={isLoading} />
			</Content>
		</Page>
	);
};

const Content = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-direction: column;
	flex-grow: 1;
`;

const ContasContainer = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 25px;

	padding-top: 20px;

	width: 100%;
	height: auto;
`;

const EmptyContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-grow: 1;

	width: 100%;
`;
