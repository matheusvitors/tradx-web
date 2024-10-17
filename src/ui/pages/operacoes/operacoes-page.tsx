import React, { useEffect, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { MdEdit, MdDelete, MdAdd, MdFilterList, MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { hexToRGBA } from 'about-colors-js'
import { format, isSameDay } from "date-fns";

import { Page, SideView } from "@/ui/layouts";
import { Operacao } from "@/application/models";
import { listOperacaoByConta, removeOperacao } from "@/application/services/operacoes";
import { MONTH, STALE_TIME } from "@/infra/config/constants";
import { UniqueValues, uniqueValues } from "@/utils/unique-values";
import { DataTablePayload, Chip, DataTable, Column } from "@/ui/components/data-display";
import { Toast, PageLoading } from "@/ui/components/feedback";
import { Checkbox, DatePicker, Button } from "@/ui/components/forms";
import { IconButton, FloatingButton, ContaSelector } from "@/ui/components/general";
import { PageHeader } from "@/ui/components/layout";
import { useSelectedConta } from "@/ui/contexts";
import { Period } from "@/application/interfaces";

interface Filter {
	ativos: Array<string>;
	tipos: Array<string>;
}

interface Range {
	dataEntrada: {
		min: Date | null;
		max: Date | null;
	}
}

const DEFAULT_FILTER_VALUES: Filter = {
	ativos: [],
	tipos: [],
}

const DEFAULT_RANGES_VALUES: Range = {
	dataEntrada: {
		min: null,
		max: null
	}
}

export const OperacoesPage: React.FC = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const location = useLocation();
	const { selectedConta } = useSelectedConta()
	const { data, isLoading, error, refetch } = useQuery<Operacao[]>({
		queryKey: ["operacoes"],
		queryFn: () => listOperacaoByConta(selectedConta!.id, {month: period.month, year: period.year}),
		staleTime: STALE_TIME,
		enabled: selectedConta ? true : false,
		retry: 5
	});

	const [operacoes, setOperacoes] = useState<DataTablePayload[]>([]);
	const [isOpenFilters, setIsOpenFilters] = useState(false);
	const [filters, setFilters] = useState<UniqueValues>();
	const [activeFilters, setActiveFilters] = useState<Filter>(DEFAULT_FILTER_VALUES);
	const [activeRanges, setActiveRanges] = useState<Range>(DEFAULT_RANGES_VALUES);
	const [period, setPeriod] = useState<Required<Period>>({ month: new Date().getMonth(), year: new Date().getFullYear()});

	const dataEntradaInicioRef = useRef<HTMLInputElement>(null);
	const dataEntradaFimRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		data && setOperacoes(preparePayloadDataTable(data));
		data && data.length > 0 && loadFiltersOptions(data);
	}, [data]);

	useEffect(() => {
		error && Toast.error(error.message || 'A mensagem não pode ser carregada');
	}, [error]);

	useEffect(() => {
		refetch();
	}, [selectedConta, period])

	useEffect(() => {
		if(data) {
			if(activeFilters.ativos.length > 0 || activeFilters.tipos.length > 0 || activeRanges.dataEntrada.min) {
				let filteredData: Operacao[] = [];

				if(activeRanges.dataEntrada.min) {
					filteredData = [];
					filteredData = data.filter(operacao => {
						if(activeRanges.dataEntrada.min) {
							const inicio = activeRanges.dataEntrada.min;
							const fim =  activeRanges.dataEntrada.max || new Date();

							return new Date(operacao.dataEntrada) >= new Date(inicio) && new Date(operacao.dataEntrada) <= new Date(fim)
						}
						return null;
					})
				}

				if(activeFilters.ativos.length > 0) {
					if(filteredData.length > 0) {
						filteredData = filteredData.filter(operacao => (activeFilters.ativos.includes(operacao.ativo.acronimo)))
					} else {
						filteredData = data.filter(operacao => (activeFilters.ativos.includes(operacao.ativo.acronimo)))
					}
				}

				if(activeFilters.tipos.length > 0) {
					if(filteredData.length > 0) {
						filteredData = filteredData.filter(operacao => (activeFilters.tipos.includes(operacao.tipo)))
					} else {
						filteredData = data.filter(operacao => (activeFilters.tipos.includes(operacao.tipo)))
					}
				}

				setOperacoes(preparePayloadDataTable(filteredData));
			} else {
				setOperacoes(preparePayloadDataTable(data))
			}

		}
	}, [activeFilters, activeRanges])

	const loadFiltersOptions = (operacoes: Operacao[]) => {
		setFilters(uniqueValues<Operacao>(operacoes, ['tipo', 'ativo', 'dataEntrada']));
	}

	const onEdit = async (operacao: Operacao) => {
		navigate("/operacoes/editar", { state: { background: location, operacao: operacao } });
	};

	const onRemove = async (operacao: Operacao) => {
		Toast.confirm(`Excluir Operação?`, `Deseja excluir a operação iniciada em ${format(operacao.dataEntrada, "dd/MM/yyyy HH:mm")}?`, "Excluir", async () => {
			await onRemoveOperacao(operacao.id);
			refetch();
		});
	};

	const onRemoveOperacao = async (id: string) => {
		try {
			await removeOperacao(id);
		} catch (error: any) {
			Toast.error(error.message);
		}
	};

	const columns: Column<Operacao | { resultadoPontos: number, resultadoFinanceiro: string, variacao: string, data: string}>[] = [
		{ name: "Data", acessor: "data" },
		{ name: "Contr.", acessor: "quantidade", width: '5%' },
		{ name: "Ativo", acessor: "ativo.acronimo" },
		{ name: "Tipo", acessor: "tipo" },
		{ name: "Entrada", acessor: "precoEntrada" },
		{ name: "Stop Loss", acessor: "stopLoss" },
		{ name: "Alvo", acessor: "alvo" },
		{ name: "Saída", acessor: "precoSaida" },
		{ name: "Hor. Entrada", acessor: "dataEntrada" },
		{ name: "Hor. Saída", acessor: "dataSaida" },
		{ name: "Res. (Pts)", acessor: "resultadoPontos"},
		{ name: "Res. ($)", acessor: "resultadoFinanceiro" },
		{ name: "Variação", acessor: "variacao" },
	];

	const preparePayloadDataTable = (input: Operacao[]): DataTablePayload[] => {
		const result: DataTablePayload[] = [];
		let variacao = 0;

		input.reverse().forEach((item: Operacao) => {
			const resultadoPontos =  item.precoSaida ? item.tipo === 'compra' ? item.precoEntrada - item.precoSaida : item.precoSaida - item.precoEntrada : '';

			if(item.precoSaida){
				variacao += typeof resultadoPontos === 'number' ? resultadoPontos * item.ativo.multiplicador : 0;
			}

			result.push({
				data: {
					...item,
					data: (isSameDay(item.dataEntrada, item.dataSaida || Date.now()) || !item.dataSaida) && format(item.dataEntrada, 'dd/MM/yyyy'),
					tipo: <Chip style={{ textTransform: 'capitalize'}} text={item.tipo} type={item.tipo === 'compra' ? 'positive' : 'negative'} />,
					dataEntrada: format(item.dataEntrada, (isSameDay(item.dataEntrada, item.dataSaida || Date.now()) || !item.dataSaida) ? 'HH:mm' : 'dd/MM/yyyy HH:mm'),
					dataSaida: item.dataSaida ? format(item.dataSaida, isSameDay(item.dataSaida, item.dataSaida || Date.now()) ? 'HH:mm' : 'dd/MM/yyyy HH:mm') : '',
					resultadoPontos,
					resultadoFinanceiro:  item.precoSaida && typeof resultadoPontos === 'number' && new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(resultadoPontos * item.ativo.multiplicador),
					variacao: item.precoSaida ? new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(variacao) : ''
				},
				actions: [
					{
						icon: MdEdit,
						callback: () => onEdit(item),
						color: theme.colors.attention,
					},
					{
						icon: MdDelete,
						callback: () => onRemove(item),
						color: theme.colors.warning,
					},
				],
				style: {
					color: `${item.precoSaida ? item.precoSaida === item.precoEntrada ? theme.common.text : resultadoPontos && resultadoPontos > 0 ? theme.colors.green : theme.colors.red :  theme.colors.orange}`
				}
			})
		})

		return result;
		// return result.reverse();
	}

	const onChangeFilter = (filter: keyof Filter, value: string, checked: boolean) => {
		if(checked){
			setActiveFilters(prevState => ({
				...prevState,
				[filter]: [...prevState[filter], value]
			}));
		} else {
			setActiveFilters(prevState => ({
				...prevState,
				[filter]: prevState[filter].filter(f => f !== value)
			}))
		}
	}

	const onChangeRanges = (filter: keyof Range, field: 'min' | 'max', value: string ) => {
		if(value.length > 0) {
			setActiveRanges(prevState => ({
				...prevState,
				[filter]: {
					...prevState[filter],
					[field]: new Date(value)
				}
			}))
		} else {
			setActiveRanges(DEFAULT_RANGES_VALUES);
		}
	}

	const onClearFilters = () => {
		setActiveFilters(DEFAULT_FILTER_VALUES);
		setActiveRanges(DEFAULT_RANGES_VALUES);

		if (dataEntradaInicioRef && dataEntradaInicioRef.current) dataEntradaInicioRef.current.value = '';
		if (dataEntradaFimRef && dataEntradaFimRef.current) dataEntradaFimRef.current.value = '';
	}

	const onPrevPeriod = async () => {
		const newMonth = period.month - 1 < 0 ? 11 : period.month - 1;
		setPeriod({month: newMonth, year: period.month - 1 < 0 ? period.year - 1 : period.year})
	}

	const onNextPeriod = async () => {
		const newMonth = period.month + 1 > 11 ? 0 : period.month + 1;
		setPeriod({month: newMonth, year: period.month + 1 > 11 ? period.year + 1 : period.year})
	}

	return (
		<Page pageName="Operações">
			<Content>
				<SideView open={isOpenFilters} setOpen={setIsOpenFilters} title="Filtros">
					{filters && (
						<>
						<FilterContent>
							{filters.ativo.acronimo.length > 1 && (
								<FilterSection>
									<FilterTitle>
										Ativos
									</FilterTitle>
									<FilterOptions>
										{filters.ativo.acronimo.map((item: string, key: number) => (
											<Checkbox key={key}
												label={item} name={item}
												checked={activeFilters.ativos.includes(item)}
												width="100px" height="35px"
												onChange={(e) => onChangeFilter('ativos', item, e.target.checked)}
											/>
										))}
									</FilterOptions>
								</FilterSection>
							)}

							{filters.tipo.length > 1 && (
								<FilterSection>
									<FilterTitle>
										Tipos
									</FilterTitle>
									<FilterOptions>
										{filters.tipo.map((item: string, key: number) => (
											<Checkbox key={key}
												label={item} name={`${item}Filter`} //foi necessário pois estava dando bug de conflitos de nome
												width="100px" height="35px"
												checked={activeFilters.tipos.includes(item)}
												onChange={(e) => onChangeFilter('tipos', item, e.target.checked)}
											/>
										))}
									</FilterOptions>
								</FilterSection>
							)}

							<FilterSection>
								<FilterTitle>Data de Entrada</FilterTitle>
								<FilterOptions>
									<DatePicker label="Inicio" name="inicio"
										min={filters.dataEntrada.min.slice(0,10)}
										max={filters.dataEntrada.max.slice(0,10)}
										onChange={(e) => onChangeRanges('dataEntrada','min', e.target.value)}
									/>
									<DatePicker label="Fim" name="fim"
										min={activeRanges.dataEntrada.min ? format(activeRanges.dataEntrada.min, 'dd/MM/yyyy HH:mm') : undefined}
										max={filters.dataEntrada.max.slice(0,10)}
										onChange={(e) => onChangeRanges('dataEntrada','max', e.target.value)}
									/>
								</FilterOptions>
							</FilterSection>
						</FilterContent>
							<FilterFooter>
								<Button label="Limpar Filtros" onClick={onClearFilters} />
							</FilterFooter>
							</>
					)}
				</SideView>

				<>
					<TableContainer>
						<PageHeader>
							<ContaSelector  />
							{data && data.length > 0 && <IconButton icon={MdFilterList} size={36} onClick={() => setIsOpenFilters(true)} />}
						</PageHeader>

						<PeriodContainer>
							<IconButton icon={MdNavigateBefore} onClick={onPrevPeriod} />
							{MONTH[period.month]} - {period.year}
							{period.month <= new Date().getMonth() + 1 && <IconButton icon={MdNavigateNext} onClick={onNextPeriod} />}
						</PeriodContainer>

						{operacoes && operacoes.length > 0 ?
							<DataTable columns={columns} payload={operacoes} />
						:
							<EmptyContainer>
								<span>Não há operações registradas.</span>
							</EmptyContainer>
						}
					</TableContainer>

					<FloatingButton icon={MdAdd} label="Nova Operação" onClick={() => navigate("/operacoes/adicionar", { state: { background: location } })} />
				</>

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

	overflow-x: hidden;
	white-space: nowrap;
`;

const TableContainer = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-direction: column;
	flex-grow: 1;
	overflow-x: auto;

	width: 100%;
`;

const EmptyContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-grow: 1;

	width: 100%;
`;

const FilterTitle = styled.div`
	display: flex;
	align-items: flex-start;

	width: 100%;
`

const FilterContent = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;

	width: 100%;
	height: 100%;
`

const FilterSection = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	flex-direction: column;
	gap: 10px;

	width: 95%;

	margin: 10px 0;
	padding-bottom: 20px;

	border-bottom: 1px solid ${props => hexToRGBA(props.theme.accent, 0.2)};
`

const FilterOptions = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 10px;
`

const FilterFooter = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 100%;
`

const PeriodContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;

	width: 100%;
	height: 50px;

	margin-bottom: 10px;

	/* border: 1px solid white; */
`
