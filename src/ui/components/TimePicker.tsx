import React, { FormEvent, InputHTMLAttributes, RefObject, useEffect, useRef } from "react";
import styled from "styled-components";
import { hexToRGBA } from "about-colors-js";
import { format } from "date-fns";

interface TimePickerProps {
	// interface TimePickerProps extends InputHTMLAttributes<HTMLInputElement>{
	label: string;
	reference?: string;
	// reference?: RefObject<HTMLInputElement>;
	defaultValue?: Date;
}

export const TimePicker: React.FC<TimePickerProps> = ({ label, reference, defaultValue }) => {
	const date = defaultValue || new Date();
	const defaultValueString = format(date, "yyyy-MM-dd");

	const dateRef = useRef<HTMLInputElement>(null);
	const timeRef = useRef<HTMLInputElement>(null);

	// useEffect(() => {
	// 	if (reference && reference.current) {
	// 		reference.current.value = '';
	// 	}
	// }, []);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		console.log(event.target.value);
		console.log('logic', reference, dateRef, timeRef);

		if ((dateRef && dateRef.current) && (timeRef && timeRef.current)) {
			console.log('foi?');

			reference = `${dateRef.current.value} ${timeRef.current.value}`;
			console.log('reference', reference);

		}

	};

	return (
		<Container>
			<Label>{label}</Label>
			<InputContainer>
				<DateInput defaultValue={defaultValueString} onChange={handleChange} ref={dateRef} />
				<TimeInput onChange={handleChange} ref={timeRef} />
			</InputContainer>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;

	height: 70px;
	width: 80%;

	margin: 15px 10px;
`;
const Label = styled.label`
	margin: 5px 0;
	font-weight: 400;
`;

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex-direction: row;

	width: 100%;
	height: 100%;
`;

const DateInput = styled.input.attrs({ type: "date" })`
	width: 50%;
	height: 100%;

	background-color: transparent;
	border: 1px solid ${(props) => hexToRGBA(props.theme.textInput.border, 0.3)};
	border-radius: 5px;

	padding: 0 10px;

	font-size: 16px;
	color: ${(props) => props.theme.textInput.text};

	/* &::-webkit-datetime-edit { padding: 1em; } */
	/* &::-webkit-datetime-edit-fields-wrapper { background: silver; } */
	/* &::-webkit-datetime-edit-text { color: red; padding: 0 0.3em; } */
	/* &::-webkit-datetime-edit-day-field { color: green; } */
	/* &::-webkit-datetime-edit-month-field { color: blue; } */
	/* &::-webkit-datetime-edit-year-field { color: purple; } */
	/* &::-webkit-inner-spin-button { display: none; } */
	/* &::-webkit-calendar-picker-indicator { background: orange; } */
`;

const TimeInput = styled.input.attrs({ type: "time" })`
	width: 50%;
	height: 100%;

	background-color: transparent;
	border: 1px solid ${(props) => hexToRGBA(props.theme.textInput.border, 0.3)};
	border-radius: 5px;

	padding: 0 10px;

	font-size: 16px;
	color: ${(props) => props.theme.textInput.text};

	/* &::-webkit-datetime-edit { padding: 1em; }
	&::-webkit-datetime-edit-fields-wrapper { background: silver; }
	&::-webkit-datetime-edit-text { color: red; padding: 0 0.3em; }
	&::-webkit-datetime-edit-month-field { color: blue; }
	&::-webkit-datetime-edit-day-field { color: green; }
	&::-webkit-datetime-edit-year-field { color: purple; }
	&::-webkit-inner-spin-button { display: none; } */
	/* &::-webkit-calendar-picker-indicator { background: orange; } */
`;
