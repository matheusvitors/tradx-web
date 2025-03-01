import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Form } from "@/ui/components/forms";
import { ModalPage } from "@/ui/layouts";
import { Toast } from "@/ui/components/feedback";
import { importOperacoes } from "@/application/services";
import { useSelectedConta } from "@/ui/contexts";
import styled from "styled-components";

interface ImportFormData {
	file: FileList;
}

export const ImportOperacoesPage: React.FC = () => {

	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { selectedConta } = useSelectedConta()
	const { register, handleSubmit, formState: { errors } } = useForm<ImportFormData>();

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		errors && errors.file?.message && Toast.error(errors.file?.message);
	}, [errors])

	const onSubmit = async (data: ImportFormData) => {
		try {
			setIsLoading(true);
			if(!selectedConta) {
				throw new Error('Não há conta selecionada');
			}

			const formData = new FormData();
			formData.append('file', data.file[0]);

			await importOperacoes({data: formData, contaId: selectedConta.id});
			queryClient.invalidateQueries({queryKey: ['operacoes']});
			navigate('/operacoes');

		} catch (error: any) {
			console.error(error);
			Toast.error(error.message || 'Erro!');
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<ModalPage title="Importar Operações">
			<Content>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<input {...register('file', {required: 'O arquivo é obrigatório!'})} type="file" accept="text/csv, .xls, .xlsx" draggable />
					<Button label="Importar" isLoading={isLoading} />
				</Form>
			</Content>
		</ModalPage>
	);
};

const Content = styled.div`
	width: 80%;
	height: 100%;
`

