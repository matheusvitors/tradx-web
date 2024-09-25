import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OperacaoDTO } from "@/application/dto/operacao-dto";
import { listAtivos, listContas, createOperacao, editOperacao } from "@/application/services";
import { Ativo, Conta } from "@/application/models";
import { KEY_ATIVOS, KEY_CONTAS } from "@/infra/config/storage-keys";
import { storage } from "@/infra/store/storage";
import { ModalPage } from "@/ui/layouts";
import { Button, Checkbox, Form, RadioButton, RadioGroup, Select, SelectOptions, Textarea, TextInput, TimePicker } from "@/ui/components/forms";
import { Toast } from "@/ui/components/feedback";


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
			operacaoPerdida: location.state.operacao?.operacaoPerdida || false,
			operacaoErrada: location.state.operacao?.operacaoErrada || false,
			motivo: location.state.operacao?.motivo,
			comentarios: location.state.operacao?.comentarios,
		},
		resolver: zodResolver(persistOperacaoFormScheme)
	})

	const [isLoading, setIsLoading] = useState(false);
	const [contaOptions, setContaOptions] = useState<SelectOptions[]>([]);
	const [ativoOptions, setAtivoOptions] = useState<SelectOptions[]>([]);

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
	}, [register])

	const loadAtivos = async () => {
		try {
			const cachedAtivos = storage.get(KEY_ATIVOS);
			let ativos: Ativo[] = [];
			if(cachedAtivos){
				ativos = JSON.parse(cachedAtivos);
			} else {
				ativos = await listAtivos();
			}

			const options: SelectOptions[] = ativos.map(ativo => ({
				label: ativo.acronimo,
				value: ativo.id,
				isSelected: ativo.id === location.state.operacao?.ativo.id ? true : false

			}))

			setValue('ativo',location.state.operacao?.ativo.id || ativos[0].id);
			setAtivoOptions(options)
		} catch (error: any) {
			console.error(error);
			Toast.error(error.message)
		}
	}

	const loadContas = async () => {
		try {
			const cachedContas = storage.get(KEY_CONTAS);
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

			setValue('conta', location.state.operacao?.conta.id || contas[0].id)
			setContaOptions(options);
		} catch (error: any) {
			Toast.error(error)
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

			location.state.operacao ? await handleEditOperacao(input) : await handleSaveOperacao(input);

			queryClient.invalidateQueries({queryKey: ['operacoes', 'dashboard']});
			navigate('/operacoes');

		} catch (error: any) {
			Toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ModalPage title={location.state.operacao ? "Editar Operação" : "Adicionar Operação"}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Select label='Conta' name='conta' list={contaOptions} value={selectConta} errors={errors} onChange={(e) => setValue('conta', e.target.value)} />
				<Select label='Ativo' name='ativo' list={ativoOptions} value={selectAtivo} errors={errors} onChange={(e) => setValue('ativo', e.target.value)} />
				<TextInput label="Quantidade" name="quantidade" type="number" register={register} errors={errors} options={{setValueAs: (v) => v === "" ? undefined : parseInt(v)}} />
				<RadioGroup>
					<RadioButton name="tipo" value="compra" label="Compra" register={register} errors={errors} />
					<RadioButton name="tipo" value="venda" label="Venda" register={register} errors={errors} />
				</RadioGroup>
				<TextInput label="Entrada" name="precoEntrada" register={register} errors={errors} options={{setValueAs: (v) => !v || v === "" ? undefined : parseFloat(v)}} />
				<TextInput label="Stop Loss" name="stopLoss" register={register} errors={errors} options={{setValueAs: (v) => !v || v === "" ? undefined : parseFloat(v)}} />
				<TextInput label="Alvo" name="alvo" register={register} errors={errors} options={{setValueAs: (v) => !v || v === "" ? undefined : parseFloat(v)}} />
				<TextInput label="Saída" name="precoSaida" register={register} errors={errors} options={{setValueAs: (v) => !v || v === "" ? undefined : parseFloat(v)}} />
				<TimePicker label="Data de Entrada" name='dataEntrada' value={dataEntrada} setValue={setValue} errors={errors} />
				<TimePicker label="Data de Saída" name='dataSaida' value={dataSaida} setValue={setValue} errors={errors} />
				<RadioGroup>
					<Checkbox label="Operação errada?" name='errada' backgroundColor="#CC1919" register={register} errors={errors} />
					<Checkbox label="Operação perdida?" name="perdida" backgroundColor="#7A7A7A" register={register} errors={errors} />
				</RadioGroup>

				<Textarea label="Comentários" name='comentarios' register={register} errors={errors}  />

				<Button label="Salvar" type="submit" isLoading={isLoading} />
			</Form>
		</ModalPage>
	);
};
