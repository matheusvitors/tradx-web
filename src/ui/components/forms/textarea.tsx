import React from 'react';
import styled from 'styled-components';
import { hexToRGBA } from 'about-colors-js';
import { UseFormRegister, RegisterOptions, FieldErrors } from 'react-hook-form';
import { InputErrorMessage } from '@/ui/components/utils';

interface TextareaProps{
// interface TextareaProps extends TextareaHTMLAttributes<HTMLInputElement>{
	label: string;
	name: string;
	register: UseFormRegister<any>;
	options?: RegisterOptions;
	errors: FieldErrors;
}

export const Textarea: React.FC<TextareaProps> = ({ label, name, register, options, errors, ...rest }) => {
	return (
		<Container>
			<Label htmlFor={name}>{label}</Label>
			<Input
				id={name}
				rows={5} cols={30}
				{...register(name, options)}
				{...rest}
				$hasError={errors && errors[name] ? true : false}
			/>
			{errors && errors[name] && <InputErrorMessage>{errors[name].message?.toString()}</InputErrorMessage>}
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;

	min-height: 70px;
	width: 80%;

	margin: 15px 10px;
`

const Label = styled.label`
	margin: 5px 0;
	font-weight: 400;
`

const Input = styled.textarea<{$hasError?: boolean;}>`
	width: 100%;
	background-color: transparent;

	border: 1px solid ${props => props.$hasError ? props.theme.colors.warning :  hexToRGBA(props.theme.input.border, 0.3)};
	border-radius: 5px;

	padding: 10px;

	font-size: 16px;
	color:  ${props => props.theme.input.text};

	resize: vertical;
`
