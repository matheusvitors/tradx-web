import React, { useEffect, useState } from 'react';
import { Page } from '@/ui/layouts';
import styled, { useTheme } from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import { STALE_TIME } from '@/infra/config/constants';
import { getDashboardInformations } from '@/application/services/dashboard';
import { Conta, Operacao } from '@/application/models';
import { storage } from '@/infra/store/storage';
import { KEY_CONTA_SELECIONADA } from '@/infra/config/storage-keys';
import { Loading, Toast } from '@/ui/components/feedback';
import { AccountCard, GotoAccountsCard } from '@/ui/components/dashboard';
import { listContas } from '@/application/services';
import { Chip, Column, DataTable, DataTablePayload } from '@/ui/components/data-display';
import { isSameDay, format } from 'date-fns';
import { MdEdit } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { Chart } from '@/ui/components/charts';

interface DashboardInformations {
	contas: Conta[];
	variacao: number[];
	operacoes: Operacao[];
}

export const HomePage: React.FC = () => {

	const [selectedConta, setSelectedConta] = useState<string>(storage.get(KEY_CONTA_SELECIONADA));
	const [operacoes, setOperacoes] = useState<DataTablePayload[]>([]);

	const theme = useTheme();
	const navigate = useNavigate();
	const location = useLocation();
	const { data, isLoading, error } = useQuery<DashboardInformations>({
		queryKey: ['dashboard'],
		queryFn: () => getDashboardInformations(selectedConta),
		staleTime: STALE_TIME,
		enabled: selectedConta ? true : false
	});

	useEffect(() => {
		error && Toast.error(error.message)
	}, [error]);

	useEffect(() => {
		if(!selectedConta) {
			(async () => {
				const contas = await listContas();
				setSelectedConta(contas[0].id);
			})()
		}

		selectedConta && selectedConta.length > 0 && storage.set(KEY_CONTA_SELECIONADA, selectedConta);
	}, [selectedConta])

	useEffect(() => {
		data && setOperacoes(preparePayloadDataTable(data.operacoes));
	}, [data]);

	const onEdit = async (operacao: Operacao) => {
		console.log({ state: { background: location, operacao: operacao } });

		// navigate("/operacoes");
		navigate("/operacoes/editar", { state: { background: location, operacao: operacao } });
	};

	const columns: Column<Operacao | { data: string }>[] = [
		{ name: "Data", acessor: "data" },
		{ name: "Contr.", acessor: "quantidade", width: '5%' },
		{ name: "Ativo", acessor: "ativo.acronimo" },
		{ name: "Tipo", acessor: "tipo" },
		{ name: "Entrada", acessor: "precoEntrada" },
		{ name: "Stop Loss", acessor: "stopLoss" },
		{ name: "Alvo", acessor: "alvo" },
		{ name: "Hor. Entrada", acessor: "dataEntrada" },
	];

	const preparePayloadDataTable = (input: Operacao[]): DataTablePayload[] => {
		const result: DataTablePayload[] = [];

		input.reverse().forEach((item: Operacao) => {

			result.push({
				data: {
					...item,
					data: (isSameDay(item.dataEntrada, item.dataSaida || Date.now()) || !item.dataSaida) && format(item.dataEntrada, 'dd/MM/yyyy'),
					tipo: <Chip style={{ textTransform: 'capitalize'}} text={item.tipo} type={item.tipo === 'compra' ? 'positive' : 'negative'} />,
					dataEntrada: format(item.dataEntrada, (isSameDay(item.dataEntrada, item.dataSaida || Date.now()) || !item.dataSaida) ? 'HH:mm' : 'dd/MM/yyyy HH:mm'),
				},
				actions: [
					{
						icon: MdEdit,
						callback: () => onEdit(item),
						color: theme.colors.attention,
					},
				],
				style: {
					color: theme.colors.orange
				}
			})
		})
		console.log(result);

		return result;

	}

	return (
		<Page pageName='Home'>
			<Content>
				<ContasContainer>
					{isLoading && <Loading visible={isLoading} />}
					{data && data.contas.map(conta => <AccountCard key={conta.id} conta={conta} selected={selectedConta === conta.id} setSelectedConta={setSelectedConta} />)}
					<GotoAccountsCard />
				</ContasContainer>

				<RelatoriosContainer>
					<Chart />
				</RelatoriosContainer>

				<OperacoesContainer>
					<DataTable columns={columns} payload={operacoes} />
				</OperacoesContainer>
			</Content>
		</Page>
	);
}

const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	width: 100%;
`

const ContasContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 20px;
	flex-grow: 1;

	overflow-y: auto;

	width: 100%;
	height: 20%;

	/* border: 1px solid red; */
`

const RelatoriosContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	width: 100%;
	height: 50%;

	overflow-y: auto;

	/* border: 1px solid green; */
`

const OperacoesContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 30%;

	padding: 20px;

	/* border: 1px solid blue; */

`

