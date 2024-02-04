import React, { HTMLInputTypeAttribute, InputHTMLAttributes, RefObject } from 'react';
import styled from 'styled-components';
import { hexToRGBA } from 'about-colors-js';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement>{
	label: string;
	type?: HTMLInputTypeAttribute;
	name: string;
	reference?: RefObject<HTMLInputElement>;
}

export const TextInput: React.FC<TextInputProps> = ({ label, type, name, reference, ...rest }) => {
	return (
		<Container>
			<Label>{label}</Label>
			<Input  type={type || 'text'} {...rest} ref={reference} />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;

	height: 70px;
	width: 80%;

	margin: 15px 10px;
`

const Label = styled.label`
	margin: 5px 0;
	font-weight: 500;
`

const Input = styled.input`
	width: 100%;
	height: 80%;

	background-color: transparent;
	border: 1px solid ${props => hexToRGBA(props.theme.textInput.border, 0.3)};
	border-radius: 5px;

	padding: 0 10px;

	font-size: 16px;
	color:  ${props => props.theme.textInput.text};
`
