import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { authenticateUser } from "@/application/services/auth";
import { Toast } from "@/ui/components/feedback";
import { TextInput, Button, Form } from "@/ui/components/forms";
import { SystemName } from "@/ui/components/general";
import { SubmitHandler, useForm } from "react-hook-form";

interface LoginFormValues {
	username: string;
	password: string;
}

export const LoginPage: React.FC = () => {
	const navigate = useNavigate();
	const theme = useTheme();
	const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
		defaultValues: {
			username: '',
			password: ''
		}
	});

	const [loading, setLoading] = useState(false);

	const onSubmit: SubmitHandler<LoginFormValues> = async ({ username, password }) => {
		try {
			setLoading(true);

			await authenticateUser({ username, password });
			navigate("/home");
		} catch (error: any) {
			Toast.error(error.message);
		} finally{
			setLoading(false);
		}
	}

	return (
		<Container>
			<Content>
				<SystemName color={theme.common.text || 'red'} width='250px' height='100px' />
				<Form onSubmit={handleSubmit(onSubmit)}>
					<TextInput label="Usuário" name="username" register={register} options={{ required: 'O usuário é obrigatório' }} errors={errors} />
					<TextInput label="Senha" type="password" name="password" register={register} options={{ required: 'A senha é obrigatória' }} errors={errors} />
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

	width: 40%;
	min-height: 50%;
`;
