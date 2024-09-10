import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { OperacaoDTO } from "@/application/dto/operacao-dto";
import { listAtivos, listContas, createOperacao, editOperacao,  } from "@/application/services";
import { Ativo, Conta, Operacao } from "@/application/models";
import { KEY_ATIVOS, KEY_CONTAS } from "@/infra/config/storage-keys";
import { storage } from "@/infra/store/storage";
import { ModalPage } from "@/ui/layouts";
import { Button, Checkbox, Form, RadioButton, RadioGroup, Select, SelectOptions, Textarea, TextInput, TimePicker } from "@/ui/components/forms";
import { Toast } from "@/ui/components/feedback";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { min } from "date-fns";


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
	precoSaida: z.number().optional(),
	dataEntrada: z.string().min(1, 'O campo é obrigatório'),
	dataSaida: z.string(),
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
			ativo: location.state.operacoes?.ativo.id,
			conta: location.state.operacoes?.conta.id,
			quantidade: location.state.operacoes?.quantidade || 1,
			tipo: location.state.operacoes?.tipo,
			precoEntrada: location.state.operacoes?.precoEntrada,
			stopLoss: location.state.operacoes?.stopLoss,
			alvo: location.state.operacoes?.alvo,
			precoSaida: location.state.operacoes?.precoSaida,
			dataEntrada: location.state.operacoes?.dataEntrada,
			dataSaida: location.state.operacoes?.dataSaida,
			operacaoPerdida: location.state.operacoes?.operacaoPerdida,
			operacaoErrada: location.state.operacoes?.operacaoErrada,
			motivo: location.state.operacoes?.motivo,
			comentarios: location.state.operacoes?.comentarios,
		},
		resolver: zodResolver(persistOperacaoFormScheme)
	})

	const [isLoading, setIsLoading] = useState(false);
	const [contaOptions, setContaOptions] = useState<SelectOptions[]>([]);
	const [ativoOptions, setAtivoOptions] = useState<SelectOptions[]>([]);

	const [dataEntrada, setDataEntrada] = useState<string | undefined>();
	const [dataSaida, setDataSaida] = useState<string | undefined>();

	const selectAtivo = watch('ativo');
	const selectConta = watch('conta');

	useEffect(() => {
		loadContas();
		loadAtivos();
	}, []);

	useEffect(() => {
		register('ativo');
		register('conta');
	}, [register])

	useEffect(() => {
		// location.state.operacao && loadOperacao(location.state.operacao);
		console.log(location.state.operacao);
	}, [location]);

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

		// let input: OperacaoDTO | null = null;

		// if(!dataEntrada) {
		// 	Toast.error('A data de entrada é obrigatória.');
		// 	return;
		// }


		// if(!dataEntrada || dataEntrada.length === 0) {
		// 	Toast.error('A data/hora de entrada é obrigatória.');
		// 	return;
		// }

		// const dateRegex = new RegExp('^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]$');

		// if(!dateRegex.test(dataEntrada)) {
		// 	Toast.error('A data/hora de entrada está incorreta.');
		// 	return;
		// }

		// if(dataSaida && !dateRegex.test(dataSaida)) {
		// 	Toast.error('A data/hora de saída está incorreta.');
		// 	return;
		// }



		try {
			setIsLoading(true);

			// if(input){
			// 	location.state.operacao ? await handleEditOperacao(input) : await handleSaveOperacao(input);
			// }

			// queryClient.invalidateQueries({queryKey: ['operacoes']});
			// navigate('/operacoes');

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
				<TextInput label="Entrada" name="precoEntrada" register={register} errors={errors} options={{setValueAs: (v) => v === "" ? undefined : parseFloat(v)}} />
				<TextInput label="Stop Loss" name="stopLoss" register={register} errors={errors} options={{setValueAs: (v) => v === "" ? undefined : parseFloat(v)}} />
				<TextInput label="Alvo" name="alvo" register={register} errors={errors} options={{setValueAs: (v) => v === "" ? undefined : parseFloat(v)}} />
				<TextInput label="Saída" name="precoSaida" register={register} errors={errors} options={{setValueAs: (v) => v === "" ? undefined : parseFloat(v)}} />
				<TimePicker label="Data de Entrada" name='dataEntrada' setValue={setValue} register={register} errors={errors} />
				<TimePicker label="Data de Saída" name='dataEntrada' setValue={setValue} register={register} errors={errors} />
				<RadioGroup>
					<Checkbox label="Operação errada?" name='errada' backgroundColor="#CC1919"  />
					<Checkbox label="Operação perdida?" name="perdida" backgroundColor="#7A7A7A"  />
				</RadioGroup>

				<Textarea label="Comentários" name='comentarios' register={register} errors={errors}  />

				<Button label="Salvar" type="submit" isLoading={isLoading} />
			</Form>
		</ModalPage>
	);
};
