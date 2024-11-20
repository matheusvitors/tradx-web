import React from 'react';
import styled from 'styled-components';
import { hexToRGBA } from 'about-colors-js';
import { FieldErrors } from 'react-hook-form';

interface SelectProps {
	label: string;
	name: string;
	list: SelectOptions[];
	value: string;
	errors: FieldErrors;
	onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

export interface SelectOptions {
	label: string;
	value: string | number;
}

export const Select: React.FC<SelectProps> = ({ label, name, list, value, errors, onChange }) => {
	return (
		<Container>
			<Label>{label}</Label>
			<Input
				id={name}
				value={value}
				onChange={onChange}
				$hasError={errors && errors[name] ? true : false}
			>
				{list.map(({label, value}) => <Option key={value} value={value}>{label}</Option>)}
			</Input>
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

const Input = styled.select<{$hasError?: boolean;}>`
	width: 100%;
	height: 80%;

	background-color: transparent;
	border: 1px solid ${props => props.$hasError ? props.theme.colors.warning :  hexToRGBA(props.theme.input.border, 0.3)};
	border-radius: 5px;

	padding: 0 10px;

	font-size: 16px;
	color:  ${props => props.theme.input.text};
`

const Option = styled.option`
	background-color: ${props => props.theme.common.background};
	color:  ${props => props.theme.input.text};

	&:hover {
	}
`
