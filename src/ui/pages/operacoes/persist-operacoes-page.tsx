import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineFilterAlt, MdOutlineFilterAltOff } from "react-icons/md";
import styled from "styled-components";

import { OperacaoDTO } from "@/application/dto/operacao-dto";
import { listAtivos, listContas, createOperacao, editOperacao } from "@/application/services";
import { Ativo, Conta } from "@/application/models";
import { KEY } from "@/infra/config/storage-keys";
import { storage } from "@/infra/store/storage";
import { ModalPage } from "@/ui/layouts";
import { Button, Checkbox, Form, RadioButton, RadioGroup, Select, SelectOptions, Textarea, TextInput, TimePicker } from "@/ui/components/forms";
import { Toast } from "@/ui/components/feedback";
import { useSelectedConta } from "@/ui/contexts";


const datetimeRegex = new RegExp('^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]$');

const persistOperacaoFormScheme = z.object({
	ativo: z.string().min(1, 'O campo é obrigatório'),
	conta: z.string().min(1, 'O campo é obrigatório'),
	quantidade: z.number({
		required_error: "O campo é obrigatório",
		invalid_type_error: "Deve ser um número",
	}),
	tipo: z.string().min(1, 'O campo é obrigatório'),
	precoEntrada: z.number({
		required_error: "O campo é obrigatório",
		invalid_type_error: "Deve ser um número",
	}),
	stopLoss: z.number({
		required_error: "O campo é obrigatório",
		invalid_type_error: "Deve ser um número",
	}),
	alvo: z.number({
		required_error: "O campo é obrigatório",
		invalid_type_error: "Deve ser um número",
	}),
	precoSaida: z.number({
		invalid_type_error: "Deve ser um número",
	}).optional(),
	dataEntrada: z.string().min(1, 'O campo é obrigatório').regex(datetimeRegex, 'A formatação da data está errada'),
	dataSaida: z.string().optional().or(z.string().regex(datetimeRegex, 'A formatação da data está errada')),
	operacaoPerdida: z.boolean(),
	operacaoErrada: z.boolean(),
	motivo: z.string().optional(),
	comentarios: z.string().optional(),
})

type PersistOperacaoFormData = z.infer<typeof persistOperacaoFormScheme>;

export const PersistOperacoesPage: React.FC = () => {

	const navigate = useNavigate();
	const location = useLocation()
	const queryClient = useQueryClient();
	const { selectedConta } = useSelectedConta()
	const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<PersistOperacaoFormData>({
		defaultValues: {
			ativo: location.state.operacao?.ativo.id,
			conta: location.state.operacao?.conta.id,
			quantidade: location.state.operacao?.quantidade || 1,
			tipo: location.state.operacao?.tipo || 'compra',
			precoEntrada: location.state.operacao?.precoEntrada,
			stopLoss: location.state.operacao?.stopLoss,
			alvo: location.state.operacao?.alvo,
			precoSaida: location.state.operacao?.precoSaida,
			dataEntrada: location.state.operacao?.dataEntrada || new Date(),
			dataSaida: location.state.operacao?.dataSaida,
			operacaoPerdida: location.state.operacao?.operacaoPerdida ? true : false,
			operacaoErrada: location.state.operacao?.operacaoErrada ? true : false,
			comentarios: location.state.operacao?.comentarios,
		},
		resolver: zodResolver(persistOperacaoFormScheme)
	})

	const [isLoading, setIsLoading] = useState(false);
	const [contaOptions, setContaOptions] = useState<SelectOptions[]>([]);
	const [ativoOptions, setAtivoOptions] = useState<SelectOptions[]>([]);
	const [previousAtivoOptions, setPreviousAtivoOptions] = useState<SelectOptions[]>([]);
	const [isFilterActive, setIsFilterActive] = useState<boolean>(false);

	const selectAtivo = watch('ativo');
	const selectConta = watch('conta');
	const dataEntrada = watch('dataEntrada');
	const dataSaida = watch('dataSaida');

	useEffect(() => {
		loadContas();
		loadAtivos();
	}, []);

	useEffect(() => {
		register('ativo');
		register('conta');
	}, [register]);

	useEffect(() => {
		previousAtivoOptions.length > 0 && !location.state.operacao && onFilterAtivos();
	}, [isFilterActive]);

	const loadAtivos = async () => {
		try {
			const cachedAtivos = storage.get(KEY.ATIVOS);
			let ativos: Ativo[] = [];
			if(cachedAtivos){
				ativos = JSON.parse(cachedAtivos);
			} else {
				ativos = await listAtivos();
			}

			const options: SelectOptions[] = ativos.map(ativo => ({
				label: ativo.acronimo,
				value: ativo.id,
				dataVencimento: ativo.dataVencimento,
				isSelected: ativo.id === location.state.operacao?.ativo.id ? true : false

			}))

			setValue('ativo',location.state.operacao?.ativo.id || ativos[0].id);
			setAtivoOptions(options);
			setPreviousAtivoOptions(options);
			setIsFilterActive(storage.get(KEY.FILTER_ATIVOS))
		} catch (error: any) {
			console.error(error);
			Toast.error(error.message)
		}
	}

	const loadContas = async () => {
		try {
			const cachedContas = storage.get(KEY.CONTAS);
			let contas: Conta[] = [];

			if(cachedContas){
				contas = JSON.parse(cachedContas);
			} else {
				contas = await listContas();
			}

			const options: SelectOptions[] = contas.map(conta => ({
				label: conta.nome,
				value: conta.id,
				isSelected: conta.id === location.state.operacao?.conta.id ? true : false
			}))

			setValue('conta', location.state.operacao?.conta.id || selectedConta?.id)
			setContaOptions(options);
		} catch (error: any) {
			Toast.error(error)
		}
	}

	const onFilterAtivos = async () => {
		if(isFilterActive) {
			const filteredAtivoOptions = ativoOptions.filter(ativo => (ativo.dataVencimento && new Date(ativo.dataVencimento).getTime() >= new Date().getTime()) || !ativo.dataVencimento);
			setAtivoOptions(filteredAtivoOptions);
		} else {
			setAtivoOptions(previousAtivoOptions);
		}

		storage.set(KEY.FILTER_ATIVOS, isFilterActive)
	}

	const onSubmit = async (data: PersistOperacaoFormData) => {
		try {
			setIsLoading(true);

			const input: OperacaoDTO = {
				...data,
				ativoId: data.ativo,
				contaId: data.conta,
			}

			if(location.state.operacao) {
				input.id = location.state.operacao.id;
				await editOperacao(input);
			} else {
				await createOperacao(input);
			}

			queryClient.invalidateQueries({queryKey: ['operacoes']});
			queryClient.invalidateQueries({queryKey: ['dashboard']});
			navigate('/operacoes');

		} catch (error: any) {
			Toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ModalPage title={location.state.operacao ? "Editar Operação" : "Adicionar Operação"}>
			<Content>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Select label='Conta' name='conta' list={contaOptions} value={selectConta} errors={errors} onChange={(e) => setValue('conta', e.target.value)} />
					<Select label='Ativo' name='ativo' list={ativoOptions} value={selectAtivo} errors={errors} onChange={(e) => setValue('ativo', e.target.value)}
						rightIcon={isFilterActive ? MdOutlineFilterAlt : MdOutlineFilterAltOff} rightOnClick={!location.state.operacao ? () => setIsFilterActive(!isFilterActive) : undefined} />
					<TextInput label="Quantidade" name="quantidade" type="number" register={register} errors={errors} options={{setValueAs: (v) => v.lenght === 0 ? undefined : parseInt(v)}} />
					<RadioGroup>
						<RadioButton name="tipo" value="compra" label="Compra" register={register} errors={errors} />
						<RadioButton name="tipo" value="venda" label="Venda" register={register} errors={errors} />
					</RadioGroup>
					<TextInput label="Entrada" name="precoEntrada" register={register} errors={errors} options={{setValueAs: (v) => !v || v.lenght === 0 ? undefined : parseFloat(v)}} autoComplete="off" />
					<TextInput label="Stop Loss" name="stopLoss" register={register} errors={errors} options={{setValueAs: (v) => !v || v.lenght === 0 ? undefined : parseFloat(v)}} autoComplete="off" />
					<TextInput label="Alvo" name="alvo" register={register} errors={errors} options={{setValueAs: (v) => !v || v.lenght === 0 ? undefined : parseFloat(v)}} autoComplete="off" />
					<TextInput label="Saída" name="precoSaida" register={register} errors={errors} options={{setValueAs: (v) => !v || v.lenght === 0 ? undefined : parseFloat(v)}} autoComplete="off" />
					<TimePicker label="Data de Entrada" name='dataEntrada' value={dataEntrada} setValue={setValue} errors={errors} />
					<TimePicker label="Data de Saída" name='dataSaida' value={dataSaida} setValue={setValue} errors={errors} />
					<RadioGroup>
						<Checkbox label="Operação errada?" name='operacaoErrada' backgroundColor="#CC1919" register={register} errors={errors} />
						<Checkbox label="Operação perdida?" name="operacaoPerdida" backgroundColor="#7A7A7A" register={register} errors={errors} />
					</RadioGroup>
					<Textarea label="Comentários" name='comentarios' register={register} errors={errors}  />

					<Button label="Salvar" type="submit" isLoading={isLoading} />
				</Form>
			</Content>
		</ModalPage>
	);
};

const Content = styled.div`
	width: 80%;
	height: 100%;
`
