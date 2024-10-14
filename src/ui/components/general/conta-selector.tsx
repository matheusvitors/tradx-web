import { Modal } from '@/ui/components/layout';
import { useSelectedConta } from '@/ui/contexts';
import React, { RefObject, useState } from 'react';
import styled from 'styled-components';

interface ContaSelectorProps {
	label: string;
	name: string;
	options: ContaSelectorOptions[];
	reference?: RefObject<HTMLSelectElement>;
	value?: string;
	onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

export interface ContaSelectorOptions {
	label: string;
	value: string | number;
	isSelected?: boolean;
}

export const ContaSelector: React.FC = () => {
	const { selectedConta } = useSelectedConta();

	const [isOpenSelector, setIsOpenSelector] = useState(false)

	const ModalSelector = () => {
		return (
			<Modal title='teste' isOpen={isOpenSelector} setIsOpen={() => setIsOpenSelector(!isOpenSelector)}  />
		)
	}

	return (
		<Container onClick={() => setIsOpenSelector(!isOpenSelector)}>
			<Label>{selectedConta?.nome || 'Selecione a conta'}</Label>
			<ModalSelector />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;

	min-height: 70px;
	width: 100%;

	padding: 0 10px;

	cursor: pointer;

	border: 1px solid white;
`

const Label = styled.span`
	font-size: 22px;
	font-weight: 400;

	color: ${props => props.theme.colors.accent};
`

const Input = styled.select`
	width: 100%;
	height: 80%;

	background-color: transparent;
	border-radius: 5px;

	padding: 0 10px;

	font-size: 22px;
	color: ${props => props.theme.accent};

	appearance: none;
`

const Option = styled.option`
	background-color: ${props => props.theme.common.background};
	color:  ${props => props.theme.input.text};
`
