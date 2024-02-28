import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Toast, Button, Form, TextInput, RadioButton, RadioGroup } from "@/ui/components";
import { createConta } from "@/application/services/contas";
import { ModalPage } from "@/ui/layouts";
import { editConta } from "@/application/services/contas/edit-conta";
import { Conta } from "@/application/models";

export const PersistContaPage: React.FC = () => {

	const navigate = useNavigate();
	const location = useLocation()
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
		location.state.conta && loadConta(location.state.conta)
	}, [location])


	const loadConta = async (conta: Conta) => {
		try {
			setIsLoading(true);
			if(
				nomeInputRef.current &&
				simuladorRadioButtonInputRef.current &&
				realRadioButtonInputRef.current &&
				saldoInicialInputRef.current
			) {
				nomeInputRef.current.value = conta.nome;
				saldoInicialInputRef.current.value = conta.saldoInicial.toFixed(2).toString();
				conta.tipo === 'simulador' ? simuladorRadioButtonInputRef.current.checked = true : realRadioButtonInputRef.current.checked = true;
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
			if (location.state.conta &&
				nomeInputRef.current &&
				simuladorRadioButtonInputRef.current &&
				realRadioButtonInputRef.current &&
				saldoInicialInputRef.current
			) {

				await editConta({
					id: location.state.conta.id,
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
			location.state.conta ? handleEditConta() : handleCreateConta();
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
		<ModalPage title={location.state.conta ? "Editar Conta" : "Adicionar Conta"}>
			<Form onSubmit={onSubmit}>
				<TextInput label="Nome" reference={nomeInputRef} />
				<TextInput label="Saldo Inicial" type="number" step="0.01" placeholder='0.00' reference={saldoInicialInputRef}  />
				<RadioGroup>
					<RadioButton name="tipo" value="simulador" label="simulador" onChange={onChangeTipoInput} reference={simuladorRadioButtonInputRef} />
					<RadioButton name="tipo" value="real" label="real" onChange={onChangeTipoInput} reference={realRadioButtonInputRef} />
				</RadioGroup>
				<Button label={location.state.conta ? "Editar Conta" : "Criar Conta"} type="submit" isLoading={isLoading} />
			</Form>
		</ModalPage>
	);
};
