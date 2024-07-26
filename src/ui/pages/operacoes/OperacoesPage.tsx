import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { MdEdit, MdDelete, MdAdd, MdFilterList } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { hexToRGBA } from 'about-colors-js'
import { Page, SideView } from "@/ui/layouts";
import { Conta, Operacao } from "@/application/models";
import { listOperacaoByConta, removeOperacao } from "@/application/services/operacoes";
import { STALE_TIME } from "@/infra/config/constants";
import { Button, Checkbox, Column, DataTable, DataTablePayload, DatePicker, FloatingButton, HeaderSelector, IconButton, PageLoading, SelectOptions, Timeline, Toast } from "@/ui/components";
import { listContas } from "@/application/services";
import { KEY_CONTAS, KEY_CONTA_SELECIONADA } from "@/infra/config/storage-keys";
import { storage } from "@/infra/store/storage";
import { UniqueValues, uniqueValues } from "@/utils/unique-values";

//FIXME: Mudança de conta as vezes não carrega suas operações corretamente

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
	const { data, isLoading, error, refetch } = useQuery<Operacao[]>({
		queryKey: ["operacoes"],
		queryFn: () => listOperacaoByConta(storage.get(KEY_CONTA_SELECIONADA)?.data || ""),
		staleTime: STALE_TIME,
		enabled: storage.get(KEY_CONTA_SELECIONADA)?.data ? true : false
	});

	const [operacoes, setOperacoes] = useState<DataTablePayload[]>([]);
	const [contaOptions, setContaOptions] = useState<SelectOptions[]>([]);
	const [selectedConta, setSelectedConta] = useState("");
	const [isOpenFilters, setIsOpenFilters] = useState(false);
	const [filters, setFilters] = useState<UniqueValues>();
	const [activeFilters, setActiveFilters] = useState<Filter>(DEFAULT_FILTER_VALUES);
	const [activeRanges, setActiveRanges] = useState<Range>(DEFAULT_RANGES_VALUES);

	const contaSelectRef = useRef<HTMLSelectElement>(null);
	const dataEntradaInicioRef = useRef<HTMLInputElement>(null);
	const dataEntradaFimRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		loadContas();
		const storagedConta = storage.get(KEY_CONTA_SELECIONADA);
		setSelectedConta(storagedConta?.data || "");
	}, []);

	useEffect(() => {
		data && data.length > 0 && setOperacoes(preparePayloadDataTable(data));
		data && data.length > 0 && loadFiltersOptions(data);
	}, [data]);

	useEffect(() => {
		error && Toast.error(error.message);
	}, [error]);

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

	const loadContas = async () => {
		try {
			const cachedContas = storage.get(KEY_CONTAS);
			let contas: Conta[] = [];

			if (cachedContas) {
				if (cachedContas.expiration && Date.now() > cachedContas.expiration) {
					contas = await listContas();
				} else {
					contas = JSON.parse(cachedContas.data);
				}
			} else {
				contas = await listContas();
			}

			const options: SelectOptions[] = contas.map((conta) => ({
				label: conta.nome,
				value: conta.id,
			}));

			setContaOptions(options);

			const defaultConta = storage.get(KEY_CONTA_SELECIONADA);
			defaultConta && setSelectedConta(defaultConta.data);
		} catch (error: any) {
			Toast.error(error);
		}
	};

	const loadFiltersOptions = (operacoes: Operacao[]) => {
		setFilters(uniqueValues<Operacao>(operacoes, ['tipo', 'ativo', 'dataEntrada']));
	}

	const onEdit = async (operacao: Operacao) => {
		navigate("/operacoes/editar", { state: { background: location, operacao: operacao } });
	};

	const onRemove = async (operacao: Operacao) => {
		Toast.confirm(`Excluir Operação?`, `Deseja excluir a operação iniciada em ${formatData(operacao.dataEntrada)}?`, "Excluir", async () => {
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

	const columns: Column<Operacao>[] = [
		{ name: "Ativo", acessor: "ativo.acronimo" },
		{ name: "Tipo", acessor: "tipo" },
		{ name: "Entrada", acessor: "precoEntrada" },
		{ name: "Stop Loss", acessor: "stopLoss" },
		{ name: "Alvo", acessor: "alvo" },
		{ name: "Saída", acessor: "precoSaida" },
		{ name: "Horário - Entrada", acessor: "dataEntrada" },
		{ name: "Horário - Saída", acessor: "dataSaida" },
	];

	const formatData = (date: Date): string => {
		return new Date(date).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
	};

	const preparePayloadDataTable = (input: Operacao[]): DataTablePayload[] => {
		const result: DataTablePayload[] = input.map((item: Operacao) => ({
			data: {
				...item,
				dataEntrada: new Date(item.dataEntrada).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }),
				dataSaida: item.dataSaida ? new Date(item.dataSaida).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }) : undefined,
			},
			actions: [
				{
					icon: MdEdit,
					callback: () => onEdit(item),
					color: theme.semantic.attention,
				},
				{
					icon: MdDelete,
					callback: () => onRemove(item),
					color: theme.semantic.warning,
				},
			],
		}));

		return result;
	};

	const onChangeConta = async (event: ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();
		try {
			contaSelectRef.current && storage.set(KEY_CONTA_SELECIONADA, contaSelectRef.current.value);
			setSelectedConta(event.target.value);
			const result = await listOperacaoByConta(event.target.value);
			setOperacoes(preparePayloadDataTable(result));
		} catch (error: any) {
			Toast.error(error.message);
		}
	};

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
												label={item} name={item}
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
									<DatePicker label="Inicio"
										reference={dataEntradaInicioRef}
										min={filters.dataEntrada.min.slice(0,10)}
										max={filters.dataEntrada.max.slice(0,10)}
										onChange={(e) => onChangeRanges('dataEntrada','min', e.target.value)}
									/>
									<DatePicker label="Fim"
										reference={dataEntradaFimRef}
										min={activeRanges.dataEntrada.min ? formatData(activeRanges.dataEntrada.min) : undefined}
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

				{ contaOptions && contaOptions.length > 0 ? (
					<>
						<TableContainer>
							<PageHeader>
								<HeaderSelector label="" name="conta" value={selectedConta} options={contaOptions} reference={contaSelectRef} onChange={onChangeConta} />
								<IconButton icon={MdFilterList} size={36} onClick={() => setIsOpenFilters(true)} />
							</PageHeader>

							{operacoes && operacoes.length > 0 ?
								// <DataTable columns={columns} payload={operacoes} />
								<Timeline operacoes={data || []} />
							:
								<EmptyContainer>
									<span>Não há operações registradas.</span>
								</EmptyContainer>
							}
						</TableContainer>

						<FloatingButton icon={MdAdd} label="Nova Operação" onClick={() => navigate("/operacoes/adicionar", { state: { background: location } })} />
					</>
				) : (
					<EmptyContainer>
						<span>Não há operações registradas.</span>
					</EmptyContainer>
				)}

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

const PageHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: row;
	gap: 20px;

	width: 100%;
	height: 70px;

	margin-bottom: 20px;

	/* border: 1px solid white; */
`;

const TableContainer = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-direction: column;
	flex-grow: 1;

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
	gap: 15px;

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
