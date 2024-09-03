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
import { z } from "zod";

const persistContasFormSchema = z.object({
	nome: z.string().min(1, 'O nome é obrigatório.'),
	saldoInicial: z.number().optional(),
	tipo: z.string().min(1, 'O tipo é obrigatório'),
});

type PersistContasFormData = z.infer<typeof persistContasFormSchema>;

export const PersistContaPage: React.FC = () => {

	const navigate = useNavigate();
	const location = useLocation()
	const queryClient = useQueryClient();
	const { register, handleSubmit, formState: { errors } } = useForm<PersistContasFormData>({
		defaultValues: {
			nome: location.state.conta?.nome || '',
			saldoInicial: location.state.conta?.saldoInicial || '',
			tipo: location.state.conta?.tipo || '',
		}
	});

	const [isLoading, setIsLoading] = useState(false);

	const onSubmit: SubmitHandler<PersistContasFormData> = async (data) => {

		setIsLoading(true);

		try {
			const input: ContaDTO = {
				nome: data.nome,
				saldoInicial: data.saldoInicial || 0,
				tipo: data.tipo
			}

			if(location.state.conta) {
				input.id = location.state.conta.id;
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
				<TextInput label="Saldo Inicial" name="saldoInicial" type="number" step="0.01" placeholder='0.00' register={register} options={{setValueAs: (v) => v === "" ? undefined : parseInt(v)}} errors={errors} />
				<RadioGroup>
					<RadioButton name="tipo" value="simulador" label="simulador" register={register} options={{required: true}} errors={errors} />
					<RadioButton name="tipo" value="real" label="real" register={register} options={{required: true}} errors={errors} />
				</RadioGroup>
				<Button label={location.state.conta ? "Editar Conta" : "Criar Conta"} type="submit" isLoading={isLoading} />
			</Form>
		</ModalPage>
	);
};
