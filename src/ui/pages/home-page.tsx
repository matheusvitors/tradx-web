import React, { useEffect, useState } from "react";
import { Page } from "@/ui/layouts";
import styled, { useTheme } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { isSameDay, format } from "date-fns";
import { MdEdit } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

import { STALE_TIME } from "@/infra/config/constants";
import { getDashboardInformations } from "@/application/services/dashboard";
import { Operacao, Variacao } from "@/application/models";
import { PageLoading, Toast } from "@/ui/components/feedback";
import { AccountCard } from "@/ui/components/dashboard";
import { Chip, Column, DataTable, DataTablePayload } from "@/ui/components/data-display";
import { LineChart, Serie } from "@/ui/components/charts";
import { ContaSelector } from "@/ui/components/general";
import { PageHeader } from "@/ui/components/layout";
import { useSelectedConta } from "@/ui/contexts";
import { DashboardInformations } from "@/application/interfaces/dashboard-informations";


export const HomePage: React.FC = () => {
	const [operacoes, setOperacoes] = useState<DataTablePayload[]>([]);
	const [variacoes, setVariacoes] = useState<Serie[]>([]);

	const theme = useTheme();
	const navigate = useNavigate();
	const location = useLocation();
	const { selectedConta } = useSelectedConta()
	const { data, isLoading, error, refetch } = useQuery<DashboardInformations>({
		queryKey: ["dashboard"],
		queryFn: () => getDashboardInformations(selectedConta!.id),
		staleTime: STALE_TIME,
		enabled: selectedConta ? true : false,
	});

	useEffect(() => {
		error && Toast.error(error.message);
	}, [error]);

	useEffect(() => {
		refetch();
	}, [selectedConta]);

	useEffect(() => {
		data && data.variacao.length > 0 && setVariacoes(prepareChartData(data.variacao));
		data && data.variacao.length === 0 && setVariacoes([]);
		data && setOperacoes(preparePayloadDataTable(data.operacoes));
	}, [data]);

	const onEdit = async (operacao: Operacao) => {
		navigate("/operacoes/editar", { state: { background: location, operacao: operacao } });
	};

	const columns: Column<Operacao | { data: string }>[] = [
		{ name: "Data", acessor: "data" },
		{ name: "Contr.", acessor: "quantidade", width: "5%" },
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
					data: (isSameDay(item.dataEntrada, item.dataSaida || Date.now()) || !item.dataSaida) && format(item.dataEntrada, "dd/MM/yyyy"),
					tipo: <Chip style={{ textTransform: "capitalize" }} text={item.tipo} type={item.tipo === "compra" ? "positive" : "negative"} />,
					dataEntrada: format(item.dataEntrada, isSameDay(item.dataEntrada, item.dataSaida || Date.now()) || !item.dataSaida ? "HH:mm" : "dd/MM/yyyy HH:mm"),
				},
				actions: [
					{
						icon: MdEdit,
						callback: () => onEdit(item),
						color: theme.colors.attention,
					},
				],
				color: theme.colors.orange,
			});
		});

		return result;
	};

	const prepareChartData = (input: Variacao[]): Serie[] => {
		const chartData: Serie[] = [
			{
				id: "Variação",
				data: [],
			},
		];

		input.forEach((item: Variacao) => {
			chartData[0].data.push({
				y: item.value,
				x: item.data,
			});
		});

		return chartData;
	};

	return (
		<Page pageName="Home">
			<Content>
				{isLoading && !data ? <PageLoading visible={isLoading} /> :
				<>
					<PageHeader>
						<ContaSelector />
					</PageHeader>
					<ContasContainer>
						<AccountCard label='Saldo' value={data?.conta?.saldo} />
						<AccountCard label='Ganhos' value={data?.conta?.ganhos} color={theme.colors.green} />
						<AccountCard label='Perdas' value={data?.conta?.perdas} color={theme.colors.red} />
					</ContasContainer>

					<RelatoriosContainer>
						<LineChart series={variacoes} />
					</RelatoriosContainer>

					<OperacoesContainer>{operacoes && operacoes.length > 0 && <DataTable columns={columns} payload={operacoes} />}</OperacoesContainer>
				</>}
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

	width: 100%;`;

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
`;

const RelatoriosContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	width: 100%;
	height: 50%;

	overflow-y: auto;

	/* border: 1px solid green; */
`;

const OperacoesContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 30%;

	padding: 20px;

	/* border: 1px solid blue; */
`;
