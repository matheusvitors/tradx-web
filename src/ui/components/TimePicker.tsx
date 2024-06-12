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
	//FIXME: Input retornar undefined caso ele não tenha defaultValue e nem tenha o seu valor mudado

	const defaultDateString = defaultValue ? format(defaultValue, "yyyy-MM-dd") : undefined ;
	const defaultTimeString = defaultValue ? format(defaultValue, "HH:mm") : undefined ;

	// console.log('defaultValue', label, defaultDateString, defaultTimeString);

	const [date, setDate] = useState(defaultDateString);
	const [time, setTime] = useState(defaultTimeString)

	useEffect(() => {
		defaultDateString && defaultTimeString && setValue(defaultValue ? `${defaultDateString} ${defaultTimeString}`: undefined);
		defaultValue && setDate(defaultDateString || '');
		defaultValue && setTime(defaultTimeString || '');
	}, [])

	useEffect(() => {
		setValue(`${date} ${time}`)
	}, [date, time])

	return (
		<Container>
			<Label>{label}</Label>
			<InputContainer>
				<DateInput value={date} onChange={(event) => setDate(event.target.value)} />
				<TimeInput value={time} onChange={(event) => setTime(event.target.value)}  />
				{/* <DateInput defaultValue={defaultDateString} onChange={handleChange} ref={dateRef} />
				<TimeInput defaultValue={defaultTimeString} onChange={handleChange} ref={timeRef} /> */}
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

const DateInput = styled.input.attrs({ type: 'date' })`
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
