import React, { FormEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Toast, Button, Form, TextInput, RadioButton, RadioGroup } from "@/ui/components";
import { createConta, getConta } from "@/application/services/contas";
import { ModalPage } from "@/ui/layouts";
import { editConta } from "@/application/services/contas/edit-conta";

export const PersistContaPage: React.FC = () => {

	const navigate = useNavigate();
	const params = useParams();
	const queryClient = useQueryClient();

	const [isLoading, setIsLoading] = useState(false);

	const nomeInputRef = useRef<HTMLInputElement>(null);
	const saldoInicialInputRef = useRef<HTMLInputElement>(null);
	const simuladorRadioButtonInputRef = useRef<HTMLInputElement>(null);
	const realRadioButtonInputRef = useRef<HTMLInputElement>(null);

	let tipoInputValue = "simulador";

	useEffect(() => {
		if(simuladorRadioButtonInputRef.current) {
			simuladorRadioButtonInputRef.current.checked = true;
		}
	}, [])

	useEffect(() => {
		if(params.id) {
			loadConta(params.id);
		}
	}, [params]);

	const loadConta = async (id: string) => {
		try {
			setIsLoading(true);
			const data = await getConta(id);
			if(
				data &&
				nomeInputRef.current &&
				simuladorRadioButtonInputRef.current &&
				realRadioButtonInputRef.current &&
				saldoInicialInputRef.current
			) {
				nomeInputRef.current.value = data.nome;
				saldoInicialInputRef.current.value = data.saldoInicial.toFixed(2).toString();
				data.tipo === 'simulador' ? simuladorRadioButtonInputRef.current.checked = true : realRadioButtonInputRef.current.checked = true;
			}
		} catch (error: any) {
			Toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	}

	const handleCreateConta = async () => {
		try {
			if (nomeInputRef.current &&
				simuladorRadioButtonInputRef.current &&
				realRadioButtonInputRef.current &&
				saldoInicialInputRef.current
			) {
				await createConta({
					nome: nomeInputRef.current.value,
					tipo: tipoInputValue,
					saldoInicial: parseFloat(saldoInicialInputRef.current.value)
				});
			}

			queryClient.invalidateQueries({queryKey: ['contas']});

			if(nomeInputRef.current && saldoInicialInputRef.current) {
				nomeInputRef.current.value = "";
				saldoInicialInputRef.current.value = "0,00";
			}

		} catch (error) {
			throw error;
		}
	}

	const handleEditConta = async () => {
		try {
			if (params.id &&
				nomeInputRef.current &&
				simuladorRadioButtonInputRef.current &&
				realRadioButtonInputRef.current &&
				saldoInicialInputRef.current
			) {

				await editConta({
					id: params.id,
					nome: nomeInputRef.current.value,
					tipo: tipoInputValue,
					saldoInicial: parseFloat(saldoInicialInputRef.current.value)
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
			params.id ? handleEditConta() : handleCreateConta();
			navigate('/contas');
		} catch (error: any) {
			Toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const onChangeTipoInput = () => {

		if(simuladorRadioButtonInputRef.current && simuladorRadioButtonInputRef.current.checked) {
			tipoInputValue = 'simulador';
		}

		if(realRadioButtonInputRef.current && realRadioButtonInputRef.current.checked) {
			tipoInputValue = 'real';
		}
	};

	return (
		<ModalPage title={params.id ? "Editar Conta" : "Adicionar Conta"}>
			<Form onSubmit={onSubmit}>
				<TextInput label="Nome" reference={nomeInputRef} />
				<TextInput label="Saldo Inicial" type="number" step="0.01" placeholder='0.00' reference={saldoInicialInputRef}  />
				<RadioGroup>
					<RadioButton name="tipo" value="simulador" label="simulador" onChange={onChangeTipoInput} reference={simuladorRadioButtonInputRef} />
					<RadioButton name="tipo" value="real" label="real" onChange={onChangeTipoInput} reference={realRadioButtonInputRef} />
				</RadioGroup>
				<Button label={params.id ? "Editar Conta" : "Criar Conta"} type="submit" isLoading={isLoading} />
			</Form>
		</ModalPage>
	);
};
