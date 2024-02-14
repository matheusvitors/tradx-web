import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Toast, Button, Form, TextInput, RadioButton } from "@/ui/components";
import { createConta, getConta } from "@/application/services/contas";
import { ModalPage } from "@/ui/layouts";
import { useNavigate, useParams } from "react-router-dom";
import { editConta } from "@/application/services/contas/edit-conta";

export const PersistContaPage: React.FC = () => {

	const navigate = useNavigate();
	const params = useParams();

	const [isLoading, setIsLoading] = useState(false);

	const nomeInputRef = useRef<HTMLInputElement>(null);
	const initialBalanceInputRef = useRef<HTMLInputElement>(null);
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
			if(data && nomeInputRef.current && simuladorRadioButtonInputRef.current && realRadioButtonInputRef.current) {
				nomeInputRef.current.value = data.nome;
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
			if (nomeInputRef.current && simuladorRadioButtonInputRef.current && realRadioButtonInputRef.current) {
				// if(initialBalanceInputRef.current.value.length > 0) {
				// 	input = {...input, initialBalance:  initialBalanceInputRef.current.value}
				// }

				await createConta({
					nome: nomeInputRef.current.value,
					tipo: tipoInputValue,
				});
			}
			if (nomeInputRef.current) {
				// if(nomeInputRef.current && initialBalanceInputRef.current) {
				nomeInputRef.current.value = "";
			}
		} catch (error) {
			throw error;
		}
	}

	const handleEditConta = async () => {
		try {
			if (params.id && nomeInputRef.current && simuladorRadioButtonInputRef.current && realRadioButtonInputRef.current) {
				// if(initialBalanceInputRef.current.value.length > 0) {
				// 	input = {...input, initialBalance:  initialBalanceInputRef.current.value}
				// }

				await editConta({
					id: params.id,
					nome: nomeInputRef.current.value,
					tipo: tipoInputValue,
				});
			}

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
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const onChangeTipoInput = (event: ChangeEvent<HTMLInputElement>) => {

		if(simuladorRadioButtonInputRef.current && simuladorRadioButtonInputRef.current.checked) {
			tipoInputValue = 'simulador';
		}

		if(realRadioButtonInputRef.current && realRadioButtonInputRef.current.checked) {
			tipoInputValue = 'real';
		}
		console.log('tipoInputValue', tipoInputValue);
	};

	return (
		<ModalPage title={params.id ? "Editar Conta" : "Adicionar Conta"}>
			<Form onSubmit={onSubmit}>
				<TextInput label="Nome" reference={nomeInputRef} />
				<TextInput disabled label="Saldo Inicial" type="number" step="0.01" placeholder='0.00' reference={initialBalanceInputRef} name={""} />
				<RadioGroup>
					<RadioButton name="tipo" value="simulador" label="simulador" onChange={onChangeTipoInput} reference={simuladorRadioButtonInputRef} />
					<RadioButton name="tipo" value="real" label="real" onChange={onChangeTipoInput} reference={realRadioButtonInputRef} />
				</RadioGroup>
				<Button label={params.id ? "Editar Conta" : "Criar Conta"} type="submit" isLoading={isLoading} />
			</Form>
		</ModalPage>
	);
};

const RadioGroup = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: row;

	width: 82%;
`;
