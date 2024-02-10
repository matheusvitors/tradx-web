import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import styled from "styled-components";
import { hexToRGBA } from 'about-colors-js';
import { MdClose } from "react-icons/md";
import { Toast, Button, Form, TextInput, RadioButton } from "@/ui/components";
import { createConta } from "@/application/services/contas";

interface NewAccountPageProps {
	open: boolean;
	closeWindow: () => void;
}

export const NovaContaPage: React.FC<NewAccountPageProps> = ({ open, closeWindow }) => {

	const [isLoading, setIsLoading] = useState(false);

	const nomeInputRef = useRef<HTMLInputElement>(null);
	let tipoInputValue: string = 'simulador';
	// const initialBalanceInputRef = useRef<HTMLInputElement>(null);

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();

		try {
			setIsLoading(true);
			if(nomeInputRef.current) {
				// if(initialBalanceInputRef.current.value.length > 0) {
				// 	input = {...input, initialBalance:  initialBalanceInputRef.current.value}
				// }

				await createConta({
					nome: nomeInputRef.current.value,
					tipo: tipoInputValue
				});
			}
			closeWindow();
			if(nomeInputRef.current) {
			// if(nomeInputRef.current && initialBalanceInputRef.current) {
				nomeInputRef.current.value = ''
			}
		} catch (error: any) {
			Toast.error(error.message);
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

	const onChangeTipoInput = (event: ChangeEvent<HTMLInputElement>) => {
		tipoInputValue = event.currentTarget.value;
	}

	return (
		<Container open={open}>
			<Card>
				<Header>
					<PageName>Adicionar Conta</PageName>
					<CloseButton onClick={closeWindow}> <MdClose /> </CloseButton>
				</Header>
				<Content>
					<Form onSubmit={onSubmit}>
						<TextInput label="Nome" reference={nomeInputRef} />
						<RadioGroup>
							<RadioButton name="tipo" value="simulador" label="simulador" onChange={onChangeTipoInput} checked />
							<RadioButton name="tipo" value="real" label="real" onChange={onChangeTipoInput} />
						</RadioGroup>
						{/* <TextInput label="Saldo Inicial" type="number" step="0.01" placeholder='0.00' reference={initialBalanceInputRef} name={""} /> */}
						<Button label="Criar Conta" type="submit" isLoading={isLoading} />
					</Form>
				</Content>
			</Card>
		</Container>
	);
};

const Container = styled.div<{ open: boolean; }>`
	display: ${props => props.open ? 'flex' : 'none'};
	align-items: center;
	justify-content: center;

	width: 100vw;
	height: 100vh;
	z-index: 0;
	position: absolute;

	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	background-color: rgba(0, 0, 0, 0.4);
`;

const Card = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;

	background-color: ${props => props.theme.common.background};
	width: 50%;
	height: 45%;

	border-radius: 10px;
	box-shadow: 0px 0px 20px -8px ${(props) => hexToRGBA(props.theme.card.shadowColor, 0.45)};
`

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;

	height: 20%;
	width: 100%;

	padding: 20px;
`

const PageName = styled.span`
	display: flex;
	justify-content: flex-start;

	width: 70%;

	font-size: 24px;
`

const CloseButton = styled.button`
	display: flex;
	justify-content: flex-end;

	width: 30%;
	background-color: transparent;

	svg {
		font-size: 32px;
	}
`

const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;

	height: 90%;
	width: 100%;

	padding: 20px;

	/* overflow-y: scroll; */
`

const RadioGroup = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: row;

	width: 82%;
`
