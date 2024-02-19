import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { TextInput, RadioButton, Button, RadioGroup, Form, Toast } from "@/ui/components";
import { ModalPage } from "@/ui/layouts";
import { createAtivo } from "@/application/services/ativos";

export const PersistAtivoPage: React.FC = () => {

	const navigate = useNavigate();
	const params = useParams();
	const queryClient = useQueryClient();

	const [isLoading, setIsLoading] = useState(false);

	const nomeInputRef = useRef<HTMLInputElement>(null);
	const acronimoInputRef = useRef<HTMLInputElement>(null);
	const acaoRadioButtonInputRef = useRef<HTMLInputElement>(null);
	const indiceRadioButtonInputRef = useRef<HTMLInputElement>(null);

	let tipoInputValue = "indice";

	useEffect(() => {
		if(indiceRadioButtonInputRef.current) {
			indiceRadioButtonInputRef.current.checked = true;
		}
	}, [])


	const onChangeTipoInput = () => {
		if(acaoRadioButtonInputRef.current && acaoRadioButtonInputRef.current.checked) {
			tipoInputValue = 'acao';
		}

		if(indiceRadioButtonInputRef.current && indiceRadioButtonInputRef.current.checked) {
			tipoInputValue = 'indice';
		}
	}

	const handleCreateAtivo = async () => {
		try {
			if (nomeInputRef.current &&
				acronimoInputRef.current &&
				acaoRadioButtonInputRef.current &&
				indiceRadioButtonInputRef.current
			) {
				await createAtivo({
					nome: nomeInputRef.current.value,
					tipo: tipoInputValue,
					acronimo: acronimoInputRef.current.value
				});
			}

			queryClient.invalidateQueries({queryKey: ['contas']});

			if(nomeInputRef.current && acronimoInputRef.current) {
				nomeInputRef.current.value = "";
				acronimoInputRef.current.value = "";
			}

		} catch (error) {
			throw error;
		}
	}

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();

		try {
			setIsLoading(true);
			// params.id ? handleEditConta() : handleCreateConta();
			await handleCreateAtivo();

			queryClient.invalidateQueries({queryKey: ['ativos']});

			navigate('/ativos');
		} catch (error: any) {
			Toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ModalPage title="Adicionar Ativo">
			<Form onSubmit={onSubmit}>
				<TextInput label="Nome" reference={nomeInputRef} />
				<TextInput label="Acronimo" reference={acronimoInputRef} />
				<RadioGroup>
					<RadioButton name="tipo" value="indice" label="Índice" onChange={onChangeTipoInput} reference={indiceRadioButtonInputRef} />
					<RadioButton name="tipo" value="acao" label="Ação" onChange={onChangeTipoInput} reference={acaoRadioButtonInputRef} />
				</RadioGroup>
				<Button label={params.id ? "Editar Ativo" : "Criar Ativo"} type="submit" isLoading={isLoading} />
			</Form>
		</ModalPage>
	);
};
