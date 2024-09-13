import React, { InputHTMLAttributes } from "react";
import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";
import styled from "styled-components";

//TODO: Refatorar de acordo com essa ideia: https://chatgpt.com/c/1f066fa2-2741-4938-8193-eb0795ac5bfa
interface RadioButtonParams extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	value: string;
	checked?: boolean;
	label: string;
	register: UseFormRegister<any>;
	options?: RegisterOptions;
	errors: FieldErrors;
}

export const RadioButton: React.FC<RadioButtonParams> = ({ name, value, label, register, options, errors, ...rest}) => {
	return (
		<Container>
			<Radio
				type="radio"
				id={value}
				value={value}
				{...register(name, options)}
				{...rest}
			/>
			<Label htmlFor={value} $hasError={errors && errors[name] ? true : false}>{label}</Label>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;

	margin: 10px 0px;

	height: 50px;
	width: 100%;
	`

const Radio = styled.input`
	display: none;

	&[type="radio"]:checked + label {
		background-color: ${props => props.theme.input.background};
		color: ${props => props.theme.input.text};
		border: 1px solid ${props => props.theme.input.background};
	}

	`

const Label = styled.label<{$hasError?: boolean;}>`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 100%;

	cursor: pointer;

	border-radius: 5px;
	border: 1px solid ${props => props.$hasError ? props.theme.colors.warning : props.theme.input.background};

`
