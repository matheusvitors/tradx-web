import React, { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { hexToRGBA } from 'about-colors-js';
import { UseFormRegister, FieldErrors, RegisterOptions } from 'react-hook-form';
import { InputErrorMessage } from '@/ui/components/utils';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement>{
	label: string;
	name: string;
	type?: HTMLInputTypeAttribute;
	textTransform?: string;
	register: UseFormRegister<any>;
	options?: RegisterOptions;
	errors: FieldErrors;
}

export const TextInput: React.FC<TextInputProps> = ({ label, type, name, textTransform, options, errors, register, ...rest }) => {
	// console.log('errros', name, errors);

	return (
		<Container>
			<Label>{label}</Label>
			<Input
				type={type || 'text'}
				$textTransform={textTransform}
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
	justify-content: flex-start;

	height: 100px;
	width: 80%;

	margin: 5px 10px;
`

const Label = styled.label`
	margin: 5px 0;
	font-weight: 400;

	height: 20px;
`

const Input = styled.input<{ $textTransform?: string; $hasError?: boolean; }>`
	width: 100%;
	height: 40px;

	background-color: transparent;
	border: 1px solid ${props => props.$hasError ? props.theme.colors.warning :  hexToRGBA(props.theme.input.border, 0.3)};
	border-radius: 5px;

	padding: 0 10px;

	font-size: 16px;
	color:  ${props => props.theme.input.text};
	text-transform: ${props => props.$textTransform || 'none'};
`
