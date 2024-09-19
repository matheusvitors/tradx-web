import { Conta } from '@/application/models';
import React from 'react';
import styled from 'styled-components';

interface AccountCardProps {
	conta: Conta;
	selected?: boolean;
}

export const AccountCard: React.FC<AccountCardProps> = ({ conta, selected }) => {
	return (
		<Container selected={selected}>
			<Nome selected={selected}>{conta.nome}</Nome>
			<Saldo selected={selected}>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(conta.saldo)}</Saldo>
		</Container>
	);
}

const Container = styled.div<{ selected?: boolean; }>`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;

	width: 250px;
	height: 125px;
	padding: 10px;

	background: ${props => props.selected ? props.theme.accountCard.selected.background : props.theme.accountCard.background};

	border-radius: 10px;
	box-shadow: 0 0 8px 1px ${props => props.theme.accountCard.shadowColor};
`

const Nome = styled.div<{ selected?: boolean; }>`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	width: 100%;
	height: 35%;

	font-size: 18px;
	font-weight: bold;
	color: ${props => props.selected ? props.theme.accountCard.selected.text : props.theme.accountCard.text};
`

const Saldo = styled.div<{ selected?: boolean; }>`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	width: 100%;
	height: 65%;

	color: ${props => props.selected ? props.theme.accountCard.selected.text : props.theme.accountCard.text};
`
