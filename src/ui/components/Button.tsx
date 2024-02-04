import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
	label: string;
	type?: "button" | "submit" | "reset" | undefined;
	width?: string;
	height?: string;
	isLoading?: boolean;
	onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ label, type, width, height, isLoading, onClick }) => {
	return (
		<Container type={type} onClick={onClick} width={width} height={height} >
			{!isLoading ? label : 'Carregando...'}
		</Container>
	);
}

const Container = styled.button<{ width?: string; height?: string; }>`
	display: flex;
	align-items: center;
	justify-content: center;

	height: ${ ({ height }) => height ? height : '40px'};
	width: ${ ({ width }) => width ? width : '80%'};

	margin: 20px 0;

	background-color: ${props => props.theme.button.background};

	border-radius: 5px;

	color: ${props => props.theme.button.text};
	font-weight: bold;
	font-size: 16px;

	transition: all .4s;

	&:hover {
		background-color: ${props => props.theme.button.hover.background};
		color: ${props => props.theme.button.hover.text};
	}

`
