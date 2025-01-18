import React from 'react';
import styled from 'styled-components';
import { hexToRGBA } from 'about-colors-js';
import { FieldErrors } from 'react-hook-form';
import { IconType } from 'react-icons';
import { IconButton } from '@/ui/components/general';

interface SelectProps {
	label: string;
	name: string;
	list: SelectOptions[];
	value: string;
	errors: FieldErrors;
	onChange?: React.ChangeEventHandler<HTMLSelectElement>;
	rightIcon?: IconType;
	rightOnClick?: () => void;

}

export interface SelectOptions {
	label: string;
	value: string | number;
}

export const Select: React.FC<SelectProps> = ({ label, name, list, value, errors, onChange, rightIcon, rightOnClick }) => {
	return (
		<Container>
			<Label>{label}</Label>
			<InputContainer>
				<Input
					id={name}
					value={value}
					onChange={onChange}
					$hasError={errors && errors[name] ? true : false}
				>
					{list.map(({label, value}) => <Option key={value} value={value}>{label}</Option>)}
				</Input>
				{rightIcon && rightOnClick && <IconButton icon={rightIcon} onClick={rightOnClick} />}
			</InputContainer>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;

	height: 80px;
	width: 100%;

	margin: 10px 10px 15px 10px;
`

const Label = styled.label`
	margin: 5px 0;
	font-weight: 400;
`

const Input = styled.select<{$hasError?: boolean;}>`
	width: 100%;
	height: 80%;

	background-color: transparent;
	border: 1px solid ${props => props.$hasError ? props.theme.colors.warning :  hexToRGBA(props.theme.input.border, 0.3)};
	border-radius: 5px;

	padding: 0 10px;
	margin-right: 5px;

	font-size: 16px;
	color:  ${props => props.theme.input.text};
`

const Option = styled.option`
	background-color: ${props => props.theme.common.background};
	color:  ${props => props.theme.input.text};

	&:hover {
	}
`

const InputContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	width: 100%;
	height: 100%;
`
