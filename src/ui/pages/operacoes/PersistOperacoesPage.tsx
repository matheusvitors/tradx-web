import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { OperacaoDTO } from "@/application/dto/operacao-dto";
import { listAtivos, listContas, createOperacao, editOperacao,  } from "@/application/services";
import { Ativo, Conta, Operacao } from "@/application/models";
import { KEY_ATIVOS, KEY_CONTAS } from "@/infra/config/storage-keys";
import { storage } from "@/infra/store/storage";
import { Button, Checkbox, DatePicker, Form, RadioButton, RadioGroup, Select, SelectOptions, TextInput, Textarea, TimePicker, Toast } from "@/ui/components";
import { ModalPage } from "@/ui/layouts";
import { formatDate } from "@/utils/format-date";

export const PersistOperacoesPage: React.FC = () => {

	const navigate = useNavigate();
	const location = useLocation()
	const queryClient = useQueryClient();


	const [isLoading, setIsLoading] = useState(false);
	const [contaOptions, setContaOptions] = useState<SelectOptions[]>([]);
	const [ativoOptions, setAtivoOptions] = useState<SelectOptions[]>([]);

	const contaSelectRef = useRef<HTMLSelectElement>(null);
	const ativoSelectRef = useRef<HTMLSelectElement>(null);
	const quantidadeInputRef = useRef<HTMLInputElement>(null);
	const compraRadioButtonInputRef = useRef<HTMLInputElement>(null);
	const vendaRadioButtonInputRef = useRef<HTMLInputElement>(null);
	const precoEntradaInputRef = useRef<HTMLInputElement>(null);
	const stopLossInputRef = useRef<HTMLInputElement>(null);
	const alvoInputRef = useRef<HTMLInputElement>(null);
	const precoSaidaInputRef = useRef<HTMLInputElement>(null);
	let dataEntradaInputRef = '';
	let dataSaidaInputRef = '';
	const operacaoPerdidaCheckboxInputRef = useRef<HTMLInputElement>(null);
	const operacaoErradaCheckboxInputRef = useRef<HTMLInputElement>(null);
	const comentariosTextareaRef = useRef<HTMLTextAreaElement>(null);

	let tipoInputValue = "compra";

	useEffect(() => {
		if(compraRadioButtonInputRef.current) {
			compraRadioButtonInputRef.current.checked = true;
		}

		loadContas();
		loadAtivos();
	}, []);

	useEffect(() => {
		location.state.operacao && loadOperacao(location.state.operacao);
	}, [location]);

	useEffect(() => {
		console.log('dataEntradaInputRef', dataEntradaInputRef)
		console.log('dataSaidaInputRef', dataSaidaInputRef)
	}, [dataEntradaInputRef, dataSaidaInputRef])

	const loadAtivos = async () => {
		try {
			const cachedAtivos = storage.get(KEY_ATIVOS);
			let ativos: Ativo[] = [];
			if(cachedAtivos){
				if(cachedAtivos.expiration && Date.now() > cachedAtivos.expiration) {
					ativos = await listAtivos();
				} else {
					ativos = JSON.parse(cachedAtivos.data);
				}
			} else {
				ativos = await listAtivos();
			}

			const options: SelectOptions[] = ativos.map(ativo => ({
				label: ativo.acronimo,
				value: ativo.id,
				isSelected: ativo.id === location.state.operacao?.ativoId ? true : false

			}))

			setAtivoOptions(options)
		} catch (error: any) {
			console.log(error);

			Toast.error(error.message)
		}
	}

	const loadContas = async () => {
		try {
			const cachedContas = storage.get(KEY_CONTAS);
			let contas: Conta[] = [];

			if(cachedContas){
				if(cachedContas.expiration && Date.now() > cachedContas.expiration) {
					contas = await listContas();
				} else {
					contas = JSON.parse(cachedContas.data);
				}
			} else {
				contas = await listContas();
			}

			const options: SelectOptions[] = contas.map(conta => ({
				label: conta.nome,
				value: conta.id,
			}))

			setContaOptions(options);
		} catch (error: any) {
			Toast.error(error)
		}
	}

	const loadOperacao = (operacao: Operacao) => {
		setIsLoading(true);

		if(
			contaSelectRef.current &&
			ativoSelectRef.current &&
			// dataEntradaInputRef.current &&
			quantidadeInputRef.current &&
			compraRadioButtonInputRef.current &&
			vendaRadioButtonInputRef.current &&
			precoEntradaInputRef.current &&
			stopLossInputRef.current &&
			alvoInputRef.current &&
			precoSaidaInputRef.current &&
			// dataSaidaInputRef.current &&
			operacaoErradaCheckboxInputRef.current &&
			operacaoPerdidaCheckboxInputRef.current &&
			comentariosTextareaRef.current
		) {
			quantidadeInputRef.current.value = `${operacao.quantidade}`;
			operacao.tipo === 'acao' ? compraRadioButtonInputRef.current.checked = true : vendaRadioButtonInputRef.current.checked = true;

			precoEntradaInputRef.current.value = `${operacao.precoEntrada}`
			stopLossInputRef.current.value = `${operacao.stopLoss}`
			alvoInputRef.current.value = `${operacao.alvo}`
			precoSaidaInputRef.current.value = operacao.precoSaida ? `${operacao.precoSaida}` : '';
			// dataEntradaInputRef.current.value = formatDate(new Date(operacao.dataEntrada));
			// dataSaidaInputRef.current.value = operacao.dataSaida ? formatDate(new Date(operacao.dataSaida)) : '';
			operacaoErradaCheckboxInputRef.current.checked = operacao.operacaoErrada || false;
			operacaoPerdidaCheckboxInputRef.current.checked = operacao.operacaoPerdida || false;
			comentariosTextareaRef.current.value = operacao.comentarios || '';
		}

		setIsLoading(false);
	}

	const onChangeTipoInput = () => {
		if(compraRadioButtonInputRef.current && compraRadioButtonInputRef.current.checked) {
			tipoInputValue = 'compra';
		}

		if(vendaRadioButtonInputRef.current && vendaRadioButtonInputRef.current.checked) {
			tipoInputValue = 'venda';
		}
	}

	const handleSaveOperacao = async (input: OperacaoDTO) => {
		try {
			await createOperacao(input)
		} catch (error) {
			throw error;
		}
	}

	const handleEditOperacao = async (operacao: OperacaoDTO) => {
		const input = {
			...operacao,
			id: location.state.operacao.id
		}

		try {
			await editOperacao(input);
		} catch (error: any) {
			Toast.error(error.message);
		}
	}

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();

		let input: OperacaoDTO | null = null;


		if(
			contaSelectRef.current &&
			ativoSelectRef.current &&
			// dataEntradaInputRef.current &&
			quantidadeInputRef.current &&
			compraRadioButtonInputRef.current &&
			vendaRadioButtonInputRef.current &&
			precoEntradaInputRef.current &&
			stopLossInputRef.current &&
			alvoInputRef.current &&
			precoSaidaInputRef.current &&
			// dataSaidaInputRef.current &&
			operacaoErradaCheckboxInputRef.current &&
			operacaoPerdidaCheckboxInputRef.current &&
			comentariosTextareaRef.current
		) {
			input = {
				ativoId: ativoSelectRef.current.value,
				contaId: contaSelectRef.current.value,
				quantidade: parseInt(quantidadeInputRef.current.value),
				tipo: tipoInputValue,
				precoEntrada: parseFloat(precoEntradaInputRef.current.value),
				stopLoss: parseFloat(stopLossInputRef.current.value),
				alvo: parseFloat(alvoInputRef.current.value),
				precoSaida: parseFloat(precoSaidaInputRef.current.value) || undefined,
				dataEntrada: dataEntradaInputRef,
				dataSaida: dataSaidaInputRef,
				// dataEntrada: dataEntradaInputRef.current.value,
				// dataSaida: dataSaidaInputRef.current.value,
				operacaoPerdida: operacaoPerdidaCheckboxInputRef.current.checked,
				operacaoErrada: operacaoErradaCheckboxInputRef.current.checked,
				comentarios: comentariosTextareaRef.current.value,
			}
		}

		try {
			setIsLoading(true);

			if(input){
				location.state.operacao ? await handleEditOperacao(input) : await handleSaveOperacao(input);
			}

			queryClient.invalidateQueries({queryKey: ['operacoes']});
			navigate('/operacoes');

		} catch (error: any) {
			Toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ModalPage title="Adicionar Operação">
			<Form onSubmit={onSubmit}>
				<Select label='Conta' name='conta' options={contaOptions} reference={contaSelectRef} />
				<Select label='Ativo' name='ativo' options={ativoOptions} reference={ativoSelectRef} />
				<TextInput label="Quantidade" reference={quantidadeInputRef} />
				<RadioGroup>
					<RadioButton name="tipo" value="compra" label="Compra" onChange={onChangeTipoInput} reference={compraRadioButtonInputRef} />
					<RadioButton name="tipo" value="venda" label="Venda" onChange={onChangeTipoInput} reference={vendaRadioButtonInputRef} />
				</RadioGroup>
				<TextInput label="Entrada" reference={precoEntradaInputRef} />
				<TextInput label="Stop Loss" reference={stopLossInputRef} />
				<TextInput label="Alvo" reference={alvoInputRef} />
				<TextInput label="Saída" reference={precoSaidaInputRef} />
				{/* <DatePicker label="Data de Entrada" reference={dataEntradaInputRef} />
				<DatePicker label="Data de Saída" reference={dataSaidaInputRef} /> */}
				<TimePicker label="Data de Entrada" reference={dataEntradaInputRef} />
				<TimePicker label="Data de Saída" reference={dataSaidaInputRef} />
				<RadioGroup>
					<Checkbox label="Operação errada?" name='errada' backgroundColor="#CC1919" reference={operacaoErradaCheckboxInputRef} />
					<Checkbox label="Operação perdida?" name="perdida" backgroundColor="#7A7A7A" reference={operacaoPerdidaCheckboxInputRef} />
				</RadioGroup>

				<Textarea label="Comentários" name='comentarios' reference={comentariosTextareaRef} />

				<Button label="Salvar" type="submit" isLoading={isLoading} />
			</Form>
		</ModalPage>
	);
};

