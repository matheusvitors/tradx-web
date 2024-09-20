import { Conta } from '@/application/models';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface AccountCardProps {
	conta: Conta;
	selected?: boolean;
	setSelectedConta: React.Dispatch<React.SetStateAction<string>>;
}

export const AccountCard: React.FC<AccountCardProps> = ({ conta, selected, setSelectedConta }) => {

	return (
		<Container selected={selected} onClick={() => setSelectedConta(conta.id)}>
			<Nome selected={selected}>{conta.nome}</Nome>
			<Saldo selected={selected}>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(conta.saldo)}</Saldo>
		</Container>
	);
}

export const GotoAccountsCard: React.FC = () => {

	const navigate = useNavigate();

	return (
		<Container $gotoCard style={{justifyContent: 'center'}} onClick={() => navigate('/contas')}>
			Ver mais
		</Container>
	);
}

const Container = styled.div<{ selected?: boolean; $gotoCard?: boolean; }>`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;

	width: 250px;
	height: 125px;
	padding: 10px;

	background: ${props => props.selected ? props.theme.accountCard.selected.background : props.theme.accountCard.background};

	border: 1px solid ${props => props.theme.colors.primary};
	border-radius: 10px;

	cursor: pointer;
	transition: all .5s;

	&:hover {
		box-shadow: 0 0 8px 2px ${props => props.theme.accountCard.shadowColor};
	}

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
