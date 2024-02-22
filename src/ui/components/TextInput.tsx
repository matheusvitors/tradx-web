import React, { HTMLInputTypeAttribute, InputHTMLAttributes, RefObject } from 'react';
import styled from 'styled-components';
import { hexToRGBA } from 'about-colors-js';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement>{
	label: string;
	type?: HTMLInputTypeAttribute;
	reference?: RefObject<HTMLInputElement>;
	textTransform?: string;
}

export const TextInput: React.FC<TextInputProps> = ({ label, type, name, reference, textTransform, ...rest }) => {
	return (
		<Container>
			<Label>{label}</Label>
			<Input  type={type || 'text'} {...rest} ref={reference} $textTransform={textTransform} />
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
	font-weight: 400;
`

const Input = styled.input<{ $textTransform?: string; }>`
	width: 100%;
	height: 80%;

	background-color: transparent;
	border: 1px solid ${props => hexToRGBA(props.theme.textInput.border, 0.3)};
	border-radius: 5px;

	padding: 0 10px;

	font-size: 16px;
	color:  ${props => props.theme.textInput.text};
	text-transform: ${props => props.$textTransform || 'none'};
`
