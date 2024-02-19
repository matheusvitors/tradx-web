import React, { FormHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

interface FormProps extends FormHTMLAttributes<HTMLFormElement>{
	children: ReactNode;
}

export const Form: React.FC<FormProps> = ({ children, ...rest }) => {
	return (
		<Container {...rest}>
			{children}
		</Container>
	);
}

const Container = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	width: 100%;
	height: 100%;
`
