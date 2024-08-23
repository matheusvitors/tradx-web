import React, { RefObject } from 'react';
import styled from 'styled-components';

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
`

const Label = styled.label`
	font-weight: 400;
`

const Input = styled.select`
	width: 100%;
	height: 80%;

	background-color: transparent;
	border-radius: 5px;

	padding: 0 10px;

	font-size: 22px;
	color: ${props => props.theme.accent};

	appearance: none;
`

const Option = styled.option`
	background-color: ${props => props.theme.common.background};
	color:  ${props => props.theme.input.text};
`
