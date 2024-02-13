import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Toast, Button, Form, TextInput, RadioButton } from "@/ui/components";
import { createConta, getConta } from "@/application/services/contas";
import { ModalPage } from "@/ui/layouts";
import { useNavigate, useParams } from "react-router-dom";
import { Conta } from "@/application/models";

export const PersistContaPage: React.FC = () => {

	const navigate = useNavigate();
	const params = useParams();

	const [isLoading, setIsLoading] = useState(false);

	const nomeInputRef = useRef<HTMLInputElement>(null);
	const tipoInputRef = useRef('simulador');
	const initialBalanceInputRef = useRef<HTMLInputElement>(null);

	let tipoInputValue = "simulador";

	useEffect(() => {
		if(params.id) {
			loadConta(params.id);
		}
	}, [params]);

	const loadConta = async (id: string) => {
		try {
			setIsLoading(true);
			const data = await getConta(id);
			if(data && nomeInputRef.current) {
				nomeInputRef.current.value = data.nome;
				tipoInputRef.current = data.tipo;
				// tipoInputValue = data.tipo;
				console.log(tipoInputValue);

			}
		} catch (error: any) {
			Toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	}

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();

		try {
			setIsLoading(true);
			if (nomeInputRef.current && initialBalanceInputRef.current) {
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
			navigate('/contas');
		} catch (error: any) {
			Toast.error(error.message);
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const onChangeTipoInput = (event: ChangeEvent<HTMLInputElement>) => {
		tipoInputRef.current = event.currentTarget.value;
		// tipoInputValue = event.currentTarget.value;
	};

	return (
		<ModalPage title={params.id ? "Editar Conta" : "Adicionar Conta"}>
			<Form onSubmit={onSubmit}>
				<TextInput label="Nome" reference={nomeInputRef} />
				<TextInput disabled label="Saldo Inicial" type="number" step="0.01" placeholder='0.00' reference={initialBalanceInputRef} name={""} />
				<RadioGroup>
					<RadioButton name="tipo" value="simulador" label="simulador" onChange={onChangeTipoInput} checked={'simulador' === tipoInputRef.current} />
					<RadioButton name="tipo" value="real" label="real" onChange={onChangeTipoInput} checked={'real' === tipoInputRef.current}  />
				</RadioGroup>
				<Button label="Criar Conta" type="submit" isLoading={isLoading} />
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
