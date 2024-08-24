import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { createConta } from "@/application/services/contas";
import { ModalPage } from "@/ui/layouts";
import { editConta } from "@/application/services/contas/edit-conta";
import { Conta } from "@/application/models";
import { Toast } from "@/ui/components/feedback";
import { TextInput, RadioGroup, RadioButton, Button, Form } from "@/ui/components/forms";
import { ContaDTO } from "@/application/dto";

export const PersistContaPage: React.FC = () => {

	const navigate = useNavigate();
	const location = useLocation()
	const queryClient = useQueryClient();
	// const { register, handleSubmit, formState: { errors } } = useForm<ContaDTO>({
	const { register, handleSubmit, formState: { errors } } = useForm<Omit<ContaDTO, 'id'>>({
		defaultValues: {
			nome: location.state.conta?.nome || '',
			saldoInicial: location.state.conta?.saldoInicial || '',
			tipo: location.state.conta?.tipo || '',
		}
	});

	const [isLoading, setIsLoading] = useState(false);

	const handleCreateConta = async () => {
		try {
			// if (nomeInputRef.current &&
			// 	simuladorRadioButtonInputRef.current &&
			// 	realRadioButtonInputRef.current &&
			// 	saldoInicialInputRef.current
			// ) {
			// 	await createConta({
			// 		nome: nomeInputRef.current.value,
			// 		tipo: tipoInputValue,
			// 		saldoInicial: parseFloat(saldoInicialInputRef.current.value)
			// 	});
			// }

			queryClient.invalidateQueries({queryKey: ['contas']});

			// if(nomeInputRef.current && saldoInicialInputRef.current) {
			// 	nomeInputRef.current.value = "";
			// 	saldoInicialInputRef.current.value = "0,00";
			// }

		} catch (error) {
			throw error;
		}
	}

	const handleEditConta = async () => {
		try {
			// if (location.state.conta &&
			// 	nomeInputRef.current &&
			// 	simuladorRadioButtonInputRef.current &&
			// 	realRadioButtonInputRef.current &&
			// 	saldoInicialInputRef.current
			// ) {

			// 	await editConta({
			// 		id: location.state.conta.id,
			// 		nome: nomeInputRef.current.value,
			// 		tipo: tipoInputValue,
			// 		saldoInicial: parseFloat(saldoInicialInputRef.current.value)
			// 	});
			// }

			queryClient.invalidateQueries({queryKey: ['contas']});

		} catch (error) {
			throw error;
		}
	}

	// const onSubmit = async (event: FormEvent) => {
	// 	event.preventDefault();

	// 	try {
	// 		setIsLoading(true);
	// 		location.state.conta ? handleEditConta() : handleCreateConta();
	// 		navigate('/contas');
	// 	} catch (error: any) {
	// 		Toast.error(error.message);
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// }

	const onSubmit: SubmitHandler<Omit<ContaDTO, 'id'>> = (data) => {
		setIsLoading(true);
		try {
			console.log('submit', data);
		} catch (error: any) {
			Toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ModalPage title={location.state.conta ? "Editar Conta" : "Adicionar Conta"}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<TextInput label="Nome" name="nome" register={register} options={{required: 'O nome é obrigatório'}} errors={errors}/>
				<TextInput label="Saldo Inicial" name="saldoInicial" type="number" step="0.01" placeholder='0.00' register={register}  />
				<RadioGroup>
					<RadioButton name="tipo" value="simulador" label="simulador" register={register} />
					<RadioButton name="tipo" value="real" label="real" register={register} />
				</RadioGroup>
				<Button label={location.state.conta ? "Editar Conta" : "Criar Conta"} type="submit" isLoading={isLoading} />
			</Form>
		</ModalPage>
	);
};
