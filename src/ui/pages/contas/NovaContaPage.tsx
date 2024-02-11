import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import styled from "styled-components";
import { Toast, Button, Form, TextInput, RadioButton } from "@/ui/components";
import { createConta } from "@/application/services/contas";
import { ModalPage } from "@/ui/layouts";

export const NovaContaPage: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);

	const nomeInputRef = useRef<HTMLInputElement>(null);
	let tipoInputValue: string = "simulador";
	const initialBalanceInputRef = useRef<HTMLInputElement>(null);

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
		} catch (error: any) {
			Toast.error(error.message);
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const onChangeTipoInput = (event: ChangeEvent<HTMLInputElement>) => {
		tipoInputValue = event.currentTarget.value;
	};

	return (
		<ModalPage title="Adicionar Conta">
			<Form onSubmit={onSubmit}>
				<TextInput label="Nome" reference={nomeInputRef} />
				<TextInput disabled label="Saldo Inicial" type="number" step="0.01" placeholder='0.00' reference={initialBalanceInputRef} name={""} />
				<RadioGroup>
					<RadioButton name="tipo" value="simulador" label="simulador" onChange={onChangeTipoInput} checked />
					<RadioButton name="tipo" value="real" label="real" onChange={onChangeTipoInput} />
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
