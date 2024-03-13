import React, { RefObject } from 'react';
import styled from 'styled-components';
import { hexToRGBA } from 'about-colors-js';

interface SelectProps {
	label: string;
	name: string;
	options: SelectOptions[];
	reference?: RefObject<HTMLSelectElement>;
	onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

export interface SelectOptions {
	label: string;
	value: string | number;
	isSelected?: boolean;
}

export const Select: React.FC<SelectProps> = ({ label, name, options, reference, onChange }) => {
	return (
		<Container>
			<Label>{label}</Label>
			<Input
				name={name}
				id={name}
				ref={reference}
			>
				{options.map(({label, value, isSelected}) => <Option key={value} value={value} selected={isSelected}>{label}</Option>)}
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

const Input = styled.select`
	width: 100%;
	height: 80%;

	background-color: transparent;
	border: 1px solid ${props => hexToRGBA(props.theme.textInput.border, 0.3)};
	border-radius: 5px;

	padding: 0 10px;

	font-size: 16px;
	color:  ${props => props.theme.textInput.text};
`

const Option = styled.option`
	background-color: ${props => props.theme.common.background};
	color:  ${props => props.theme.textInput.text};

	&:hover {
	}
`
