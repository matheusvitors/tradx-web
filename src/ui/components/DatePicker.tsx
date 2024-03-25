import React, { InputHTMLAttributes, RefObject } from 'react';
import styled from 'styled-components';
import { hexToRGBA } from 'about-colors-js';

interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement>{
	label: string;
	reference?: RefObject<HTMLInputElement>;
}

export const DatePicker: React.FC<DatePickerProps> = ({ label, reference, ...rest }) => {
	return (
		<Container>
			<Label>{label}</Label>
			<Input
				ref={reference}
				// defaultValue={defaultValue || new Date(new Date().getTime() - 10800000).toISOString().slice(0,16)}
				{...rest}
			/>
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

const Input = styled.input.attrs({ type: 'datetime-local' })`
	width: 100%;
	height: 80%;

	background-color: transparent;
	border: 1px solid ${props => hexToRGBA(props.theme.textInput.border, 0.3)};
	border-radius: 5px;

	padding: 0 10px;

	font-size: 16px;
	color:  ${props => props.theme.textInput.text};

	/* &::-webkit-datetime-edit { padding: 1em; }
	&::-webkit-datetime-edit-fields-wrapper { background: silver; }
	&::-webkit-datetime-edit-text { color: red; padding: 0 0.3em; }
	&::-webkit-datetime-edit-month-field { color: blue; }
	&::-webkit-datetime-edit-day-field { color: green; }
	&::-webkit-datetime-edit-year-field { color: purple; }
	&::-webkit-inner-spin-button { display: none; } */
	/* &::-webkit-calendar-picker-indicator { background: orange; } */
`
