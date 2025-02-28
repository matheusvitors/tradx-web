import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

interface AccountCardProps {
	label: string;
	value?: string;
	color?: string;
}

export const AccountCard: React.FC<AccountCardProps> = ({ label, value, color }) => {

	return (
		<Container>
			<Nome>{label}</Nome>
			<Saldo $color={color}>{value ? new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(parseFloat(value)): 'R$ 0.00'}</Saldo>
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

const Nome = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	width: 100%;
	height: 35%;

	font-size: 18px;
	font-weight: bold;
	color: ${props => props.theme.accountCard.text};
`

const Saldo = styled.div<{ $color?: string; }>`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	width: 100%;
	height: 65%;

	color: ${props => props.$color || props.theme.accountCard.text};
`
