import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AxiosError } from "axios";
import { authenticateUser } from "@/application/services/auth";
import { TextInput, Button, Toast } from "@/ui/components";

export const LoginPage: React.FC = () => {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const onSubmit = async () => {
		try {
			setLoading(true);
			if(usernameRef.current && passwordRef.current){
				await authenticateUser({ username: usernameRef.current.value, password: passwordRef.current.value });
				navigate("/home");
			}
		} catch (error: any) {
			//TODO: Criar um httpErrorHandler
			let message = "erro!";
			console.log(error);

			if (error instanceof AxiosError && error.response) {
				// if (error.response.status === 401) {
					message = error.response.data.response.message;
				// }
			} else {
				message = error.message;
			}

			Toast.error(message);
		} finally {
			setLoading(false);
		}
	};

	//TODO: Mensagem de erro nos text input

	return (
		<Container>
			<Content>
				{/* <SystemName color={theme ? theme.common.text : 'red'} width='250px' height='100px' /> */}
				{/* <Form onSubmit={onSubmit}> */}
					<TextInput label="Usuário" name="username" reference={usernameRef} />
					<TextInput label="Senha" type="password" name="password"  reference={passwordRef} />
					<Button label="Entrar" onClick={onSubmit} isLoading={loading} />
					{/* <Button label="Entrar" type="submit" isLoading={loading} /> */}
				{/* </Form> */}
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
