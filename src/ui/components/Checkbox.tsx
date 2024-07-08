import React, { InputHTMLAttributes, RefObject } from 'react';
import styled from 'styled-components';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	name: string;
	reference?: RefObject<HTMLInputElement>;
	backgroundColor?: string;
	width?: string;
	height?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, name, reference, backgroundColor ,width, height, ...rest }) => {
	return (
		<Container width={width} height={height}>
			<Input id={name} name={name} ref={reference} $backgroundColor={backgroundColor} {...rest}/>
			<Label htmlFor={name} $backgroundColor={backgroundColor}>{label}</Label>
		</Container>
	);
}

const Container = styled.div<{ width?: string; height?: string; }>`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;

	margin: 5px 0px;

	height: ${props => props.height || '50px'};
	width: ${props => props.width || '100%'};
`

const Input = styled.input.attrs({ type: 'checkbox'})<{ $backgroundColor?: string }>`
	margin-right: 10px;
	display: none;

	&[type="checkbox"]:checked + label {
		background-color: ${props => props.$backgroundColor || props.theme.textInput.background};
		color: ${props => props.theme.textInput.text};
		border: 1px solid ${props => props.$backgroundColor || props.theme.textInput.background};
	}
`

const Label = styled.label<{ $backgroundColor?: string }>`

	display: flex;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 100%;
	position: relative;

	cursor: pointer;

	z-index: 1;

	border-radius: 5px;
	border: 1px solid ${props => props.$backgroundColor || props.theme.textInput.background};

`
