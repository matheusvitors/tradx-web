import React, { RefObject } from 'react';
import styled from 'styled-components';
import { hexToRGBA } from 'about-colors-js';

interface HeaderSelectorProps {
	label: string;
	name: string;
	options: HeaderSelectorOptions[];
	reference?: RefObject<HTMLSelectElement>;
	value?: string;
	onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

export interface HeaderSelectorOptions {
	label: string;
	value: string | number;
	isSelected?: boolean;
}

export const HeaderSelector: React.FC<HeaderSelectorProps> = ({ label, name, options, reference, value, onChange }) => {
	return (
		<Container>
			<Label>{label}</Label>
			<Input
				name={name}
				id={name}
				ref={reference}
				value={value}
				onChange={onChange}
			>
				{options.map(({label, value}) => <Option key={value} value={value}>{label}</Option>)}
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
	width: 100%;

	/* background-color: transparent; */

	/* margin: 15px 10px; */
`

const Label = styled.label`
	/* margin: 5px 0; */
	font-weight: 400;
	`

const Input = styled.select`
	width: 100%;
	height: 80%;

	background-color: transparent;
	/* border: 1px solid ${props => hexToRGBA(props.theme.textInput.border, 0.3)}; */
	border-radius: 5px;

	padding: 0 10px;

	font-size: 22px;
	color: ${props => props.theme.accent};

	appearance: none;

`

const Option = styled.option`
	background-color: ${props => props.theme.common.background};
	color:  ${props => props.theme.textInput.text};

	&:hover {
	}
`
