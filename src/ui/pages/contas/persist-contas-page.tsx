import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { createConta } from "@/application/services/contas";
import { ModalPage } from "@/ui/layouts";
import { editConta } from "@/application/services/contas/edit-conta";
import { Toast } from "@/ui/components/feedback";
import { TextInput, RadioGroup, RadioButton, Button, Form } from "@/ui/components/forms";
import { ContaDTO } from "@/application/dto";

export const PersistContaPage: React.FC = () => {

	const navigate = useNavigate();
	const location = useLocation()
	const queryClient = useQueryClient();
	const { register, handleSubmit, formState: { errors }, setError } = useForm<Omit<ContaDTO, 'id'>>({
		defaultValues: {
			nome: location.state.conta?.nome || '',
			saldoInicial: location.state.conta?.saldoInicial || '',
			tipo: location.state.conta?.tipo || '',
		}
	});

	const [isLoading, setIsLoading] = useState(false);

	const onSubmit: SubmitHandler<Omit<ContaDTO, 'id'>> = async (data) => {

		setIsLoading(true);

		try {
			data.tipo.length === 0 && setError("tipo", {message: 'O tipo é obrigatório'});

			const input: ContaDTO = {
				nome: data.nome,
				saldoInicial: data.saldoInicial,
				tipo: data.tipo
			}

			if(location.state.conta) {
				input.id = location.state.conta.id
			}

			if(location.state.conta) {
				await editConta(input)
			} else {
				await createConta(input);
			}

			queryClient.invalidateQueries({queryKey: ['contas']});
			navigate('/contas');
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
				<TextInput label="Saldo Inicial" name="saldoInicial" type="number" step="0.01" placeholder='0.00' register={register} errors={errors} />
				<RadioGroup>
					<RadioButton name="tipo" value="simulador" label="simulador" register={register} options={{required: true}} errors={errors} />
					<RadioButton name="tipo" value="real" label="real" register={register} options={{required: true}} errors={errors} />
				</RadioGroup>
				<Button label={location.state.conta ? "Editar Conta" : "Criar Conta"} type="submit" isLoading={isLoading} />
			</Form>
		</ModalPage>
	);
};
