import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { hexToRGBA } from "about-colors-js";
import { format } from "date-fns";

interface TimePickerProps {
	// interface TimePickerProps extends InputHTMLAttributes<HTMLInputElement>{
	label: string;
	setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
	// reference?: RefObject<HTMLInputElement>;
	defaultValue?: Date;
}

export const TimePicker: React.FC<TimePickerProps> = ({ label, setValue, defaultValue }) => {
	//FIXME: Input retornar undefined caso ele não tenha defaultValue e nem tenha o seu valor mudado

	const defaultDateString = defaultValue ? format(defaultValue, "yyyy-MM-dd") : undefined ;
	const defaultTimeString = defaultValue ? format(defaultValue, "HH:mm") : undefined ;

	const [date, setDate] = useState();
	const [time, setTime] = useState()

	// const dateRef = useRef<HTMLInputElement>(null);
	// const timeRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		defaultDateString && defaultTimeString && setValue(defaultValue ? `${defaultDateString} ${defaultTimeString}`: undefined);
	}, [])

	useEffect(() => {
		console.log(label, `${date || format(new Date(), "yyyy-MM-dd")} ${time || format(new Date(), "HH:mm")}`);
		if(defaultValue) {
			setValue(`${date || format(new Date(), "yyyy-MM-dd")} ${time || format(new Date(), "HH:mm")}`);
		} else {
			setValue(undefined)
		}
	}, [date, time])

	// const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	event.preventDefault();
	// 	console.log('target value',event.target.value);

	// 	if ((dateRef && dateRef.current) && (timeRef && timeRef.current)) {
	// 		setValue(`${dateRef.current.value} ${timeRef.current.value}`);
	// 		console.log('data tempo', `${dateRef.current.value} ${timeRef.current.value}`);
	// 	}
	// };


	return (
		<Container>
			<Label>{label}</Label>
			<InputContainer>
				<DateInput value={defaultDateString} onChange={(event) => setDate(event.target.value)} />
				<TimeInput value={defaultTimeString} onChange={(event) => setTime(event.target.value)}  />
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
