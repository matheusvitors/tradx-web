import React, { InputHTMLAttributes, RefObject } from "react";
import styled from "styled-components";

interface RadioButtonParams extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	value: string;
	checked?: boolean;
	label: string;
	reference?:  RefObject<HTMLInputElement>;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const RadioButton: React.FC<RadioButtonParams> = ({ name, value, checked, label, reference, onChange, ...rest}) => {
	return (
		<Container>
			<Radio type="radio" id={value} name={name} value={value} checked={checked} ref={reference} onChange={onChange} {...rest} />
			<Label htmlFor={value}>{label}</Label>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;

	margin: 5px 10px;

	height: 50px;
	width: 200px;
`

const Radio = styled.input`
	display: none;

	&[type="radio"]:checked+label {
		background-color: ${props => props.theme.textInput.background};
		color: ${props => props.theme.textInput.text};
		border: 1px solid ${props => props.theme.textInput.background};
	}

	`

const Label = styled.label`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 100%;

	border: 1px solid ${props => props.theme.textInput.background};
`
