import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { hexToRGBA } from "about-colors-js";
import { format } from "date-fns";

interface TimePickerProps {
	label: string;
	setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
	defaultValue?: Date;
}

export const TimePicker: React.FC<TimePickerProps> = ({ label, setValue, defaultValue }) => {

	const defaultDateString = defaultValue ? format(defaultValue, "yyyy-MM-dd") : undefined ;
	const defaultTimeString = defaultValue ? format(defaultValue, "HH:mm") : undefined ;

	const [date, setDate] = useState(defaultDateString);
	const [hour, setHour] = useState(defaultTimeString)

	useEffect(() => {
		defaultDateString && defaultTimeString && setValue(defaultValue ? `${defaultDateString} ${defaultTimeString}`: undefined);
		defaultValue && setDate(defaultDateString || '');
		defaultValue && setHour(defaultTimeString || '');
	}, [])

	useEffect(() => {
		setValue(date && hour ? `${date} ${hour}`: undefined);
	}, [date, hour])

	return (
		<Container>
			<Label>{label}</Label>
			<InputContainer>
				<DateInput value={date} onChange={(event) => setDate(event.target.value)} />
				<TimeInput value={hour} onChange={(event) => setHour(event.target.value)}  />
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
	justify-content: space-between;
	flex-direction: row;

	width: 100%;
	height: 100%;
`;

const DateInput = styled.input.attrs({ type: 'date' })`
	width: 49%;
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
	width: 49%;
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
