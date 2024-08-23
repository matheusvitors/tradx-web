import React, { RefObject } from 'react';
import styled from 'styled-components';
import { hexToRGBA } from 'about-colors-js';

interface TextareaProps {
	label: string;
	name: string;
	reference?: RefObject<HTMLTextAreaElement>;
}

export const Textarea: React.FC<TextareaProps> = ({ label, name, reference}) => {
	return (
		<Container>
			<Label htmlFor={name}>{label}</Label>
			<Input id={name} name={name} rows={5} cols={30} ref={reference} />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;

	min-height: 70px;
	width: 80%;

	margin: 15px 10px;
`

const Label = styled.label`
	margin: 5px 0;
	font-weight: 400;
`

const Input = styled.textarea`
	width: 100%;
	background-color: transparent;

	border: 1px solid ${props => hexToRGBA(props.theme.input.border, 0.3)};
	border-radius: 5px;

	padding: 10px;

	font-size: 16px;
	color:  ${props => props.theme.input.text};

	resize: vertical;
`
