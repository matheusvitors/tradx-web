import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalPage } from "@/ui/layouts";
import { createAtivo, editAtivo } from "@/application/services/ativos";
import { Toast } from "@/ui/components/feedback";
import { TextInput, DatePicker, RadioGroup, RadioButton, Button, Form } from "@/ui/components/forms";
import { AtivoDTO } from "@/application/dto";
import styled from "styled-components";

const persistAtivoFormSchema = z.object({
	nome: z.string().min(1, 'O nome é obrigatório.'),
	acronimo: z.string().min(5, 'O acrônimo deve ter pelo menos 5 caracteres'),
	tipo: z.string().min(1, 'O tipo é obrigatório'),
	multiplicador: z.number().nonnegative('O número deve ser maior que zero').optional(),
	dataVencimento: z.string()
})

type PersistAtivoFormData = z.infer<typeof persistAtivoFormSchema>;

export const PersistAtivoPage: React.FC = () => {

	const navigate = useNavigate();
	const location = useLocation()
	const queryClient = useQueryClient();
	const { register, handleSubmit, formState: { errors } } = useForm<PersistAtivoFormData>({
		defaultValues: {
			nome: location.state.ativo?.nome || '',
			acronimo: location.state.ativo?.acronimo || '',
			tipo: location.state.ativo?.tipo || '',
			multiplicador: location.state.ativo?.multiplicador || '',
			dataVencimento: location.state.ativo?.dataVencimento ? format(location.state.ativo?.dataVencimento, 'yyyy-MM-dd') : '',
		},
		resolver: zodResolver(persistAtivoFormSchema)
	});

	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (data: PersistAtivoFormData) => {

		try {
			setIsLoading(true);

			const input: AtivoDTO = {
				nome: data.nome,
				acronimo: data.acronimo,
				tipo: data.tipo,
				multiplicador: data.multiplicador || 1,
				dataVencimento: new Date(data.dataVencimento) || null
			}

			if(location.state.ativo) {
				input.id = location.state.ativo.id;
				await editAtivo(input);
			} else {
				await createAtivo(input);
			}

			queryClient.invalidateQueries({queryKey: ['ativos']});
			navigate('/ativos');
		} catch (error: any) {
			Toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ModalPage title={location.state.ativo ? "Editar Ativo" : "Adicionar Ativo"}>
			<Content>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<TextInput label="Nome" name="nome" register={register} errors={errors} />
					<TextInput label="Acronimo" name="acronimo" textTransform="uppercase" register={register} errors={errors} />
					<DatePicker label="Data de Vencimento" name="dataVencimento" register={register} errors={errors} />
					<TextInput label="Multiplicador" name="multiplicador" type="number" step="0.01" register={register} options={{setValueAs: (v) => v === "" ? undefined : parseFloat(v),}} errors={errors} />
					<RadioGroup>
						<RadioButton name="tipo" value="indice" label="Índice" register={register} errors={errors} />
						<RadioButton name="tipo" value="acao" label="Ação" register={register} errors={errors} />
					</RadioGroup>
					<Button label={location.state.ativo ? "Editar Ativo" : "Criar Ativo"} type="submit" isLoading={isLoading} />
				</Form>
			</Content>
		</ModalPage>
	);
};

const Content = styled.div`
	width: 80%;
	height: 100%;
`
