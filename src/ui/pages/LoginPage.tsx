import React, { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authenticateUser } from "@/application/services/auth";
import { TextInput, Button, Toast, Form } from "@/ui/components";

export const LoginPage: React.FC = () => {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		try {
			setLoading(true);
			if(usernameRef.current && passwordRef.current){
				await authenticateUser({ username: usernameRef.current.value, password: passwordRef.current.value });
				navigate("/home");
			}
		} catch (error: any) {
			Toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	//TODO: Mensagem de erro nos text input

	return (
		<Container>
			<Content>
				{/* <SystemName color={theme ? theme.common.text : 'red'} width='250px' height='100px' /> */}
				<Form onSubmit={onSubmit}>
					<TextInput label="Usuário" name="username" reference={usernameRef} />
					<TextInput label="Senha" type="password" name="password"  reference={passwordRef} />
					<Button label="Entrar" type="submit" isLoading={loading} />
				</Form>
			</Content>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	width: 100%;
	min-height: 100%;

	/* background: linear-gradient(140deg, rgba(106,195,64,1) 0%, rgba(3,95,7,1) 100%); */
	background-color: ${(props) => props.theme.common.background};
`;

const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	width: 50%;
	min-height: 50%;
`;
