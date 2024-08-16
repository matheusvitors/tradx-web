import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { TextInput, RadioButton, Button, RadioGroup, Form, Toast, DatePicker } from "@/ui/components";
import { ModalPage } from "@/ui/layouts";
import { createAtivo, editAtivo } from "@/application/services/ativos";
import { Ativo } from "@/application/models";

export const PersistAtivoPage: React.FC = () => {

	const navigate = useNavigate();
	const location = useLocation()
	const queryClient = useQueryClient();

	const [isLoading, setIsLoading] = useState(false);

	const nomeInputRef = useRef<HTMLInputElement>(null);
	const acronimoInputRef = useRef<HTMLInputElement>(null);
	const dataVencimentoInputRef = useRef<HTMLInputElement>(null);
	const multiplicadorInputRef = useRef<HTMLInputElement>(null);
	const acaoRadioButtonInputRef = useRef<HTMLInputElement>(null);
	const indiceRadioButtonInputRef = useRef<HTMLInputElement>(null);

	let tipoInputValue = "indice";

	useEffect(() => {
		if(indiceRadioButtonInputRef.current) {
			indiceRadioButtonInputRef.current.checked = true;
		}
	}, [])

	useEffect(() => {
		location.state.ativo && loadAtivo(location.state.ativo)
	}, [location])

	const loadAtivo = (ativo: Ativo) => {
		if(
			nomeInputRef.current &&
			acronimoInputRef.current &&
			acaoRadioButtonInputRef.current &&
			indiceRadioButtonInputRef.current &&
			multiplicadorInputRef.current &&
			dataVencimentoInputRef.current
		) {
			nomeInputRef.current.value = ativo.nome;
			acronimoInputRef.current.value = ativo.acronimo;
			multiplicadorInputRef.current.value = `${ativo.multiplicador}`;
			dataVencimentoInputRef.current.value = ativo.dataVencimento ? format(new Date(ativo.dataVencimento), 'yyyy-MM-dd') : '';
			ativo.tipo === 'acao' ? acaoRadioButtonInputRef.current.checked = true : indiceRadioButtonInputRef.current.checked = true;

		}
	}

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
				indiceRadioButtonInputRef.current &&
				multiplicadorInputRef.current &&
				dataVencimentoInputRef.current
			) {
				await createAtivo({
					nome: nomeInputRef.current.value,
					tipo: tipoInputValue,
					acronimo: acronimoInputRef.current.value.toUpperCase(),
					dataVencimento: dataVencimentoInputRef.current.value.length > 0 ? new Date(dataVencimentoInputRef.current.value) : null,
					multiplicador: multiplicadorInputRef.current.value.length > 0 ? multiplicadorInputRef.current.value : '1'
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

	const handleEditAtivo = async () => {
		try {
			if (location.state.ativo &&
				nomeInputRef.current &&
				acronimoInputRef.current &&
				multiplicadorInputRef.current &&
				acaoRadioButtonInputRef.current &&
				indiceRadioButtonInputRef.current &&
				dataVencimentoInputRef.current
			) {

				await editAtivo({
					id: location.state.ativo.id,
					nome: nomeInputRef.current.value,
					tipo: tipoInputValue,
					acronimo: acronimoInputRef.current.value.toUpperCase(),
					dataVencimento: dataVencimentoInputRef.current.value.length > 0 ? new Date(dataVencimentoInputRef.current.value) : null,
					multiplicador: multiplicadorInputRef.current.value
				});
			}

			queryClient.invalidateQueries({queryKey: ['contas']});

		} catch (error) {
			throw error;
		}
	}

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();

		try {
			setIsLoading(true);

			location.state.ativo ? await handleEditAtivo() : await handleCreateAtivo();
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
			<Form onSubmit={onSubmit}>
				<TextInput label="Nome" reference={nomeInputRef} />
				<TextInput label="Acronimo" textTransform="uppercase" reference={acronimoInputRef} />
				<DatePicker label="Data de Vencimento" reference={dataVencimentoInputRef} />
				<TextInput label="Multiplicador" type="number" step="0.01" reference={multiplicadorInputRef} />
				<RadioGroup>
					<RadioButton name="tipo" value="indice" label="Índice" onChange={onChangeTipoInput} reference={indiceRadioButtonInputRef} />
					<RadioButton name="tipo" value="acao" label="Ação" onChange={onChangeTipoInput} reference={acaoRadioButtonInputRef} />
				</RadioGroup>
				<Button label={location.state.ativo ? "Editar Ativo" : "Criar Ativo"} type="submit" isLoading={isLoading} />
			</Form>
		</ModalPage>
	);
};
