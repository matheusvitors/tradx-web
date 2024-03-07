import React, { RefObject } from 'react';
import styled from 'styled-components';

interface CheckboxProps {
	label: string;
	name: string;
	reference?: RefObject<HTMLInputElement>;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, name, reference }) => {
	return (
		<Container>
			<Input id={name} name={name} ref={reference} />
			<Label htmlFor={name}>{label}</Label>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;

	margin: 10px 0px;

	height: 50px;
	/* width: 200px; */
	width: 100%;
`

const Input = styled.input.attrs({ type: 'checkbox'})`
	margin-right: 10px;
	display: none;

	&[type="checkbox"]:checked + label {
		background-color: blue;
	}
`

const Label = styled.label`
	display: flex;
	align-items: center;
	justify-content: center;

	position: relative;
	width: 100px;
	height: 70px;

	background-color: rgb(99, 99, 99);

	z-index: 1;
	cursor: pointer;

	border-radius: 5px;
	box-shadow: 0px 0px 3px rgb(2, 2, 2) inset;

`
