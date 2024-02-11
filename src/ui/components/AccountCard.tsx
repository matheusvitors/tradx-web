import React from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa6";
import { hexToRGBA } from "about-colors-js";
import { Conta } from "@/application/models";
import { Link, useLocation } from "react-router-dom";

interface AccountCardProps {
	conta: Conta
}

export const AccountCard: React.FC<AccountCardProps> = ({ conta }) => {
	return (
		<Container>
			<Name>{conta.nome}</Name>
			{/* <Balance>R$ {conta.balance.toFixed(2)}</Balance> */}
		</Container>
	);
};

export const NewAccountCard: React.FC = () => {

	const location = useLocation();

	return (
		<Container $new={true}>
			<NewAccountContainer to='/teste' state={{background: location}}>
				<Label><FaPlus /></Label>
				<Label>Nova Conta</Label>
			</NewAccountContainer>
		</Container>
	);
};

const Container = styled.div<{ $new?: boolean }>`
	display: flex;
	align-items: flex-start;
	justify-content: space-evenly;
	flex-direction: column;

	width: 250px;
	height: 100px;
	padding: 10px;

	box-shadow: 0px 0px 20px ${props => props.theme.card.spread} ${(props) => hexToRGBA(props.theme.card.shadowColor, 0.45)};

	border-radius: 10px;

	background: ${props =>  props.$new ? props.theme.card.background : hexToRGBA(props.theme.card.background, 0.3)};
	/* background: ${props =>  hexToRGBA(props.theme.card.background, 0.3)}; */

/* border: 1px solid red; */
`;

const Name = styled.p`
	font-size: 18px;
`;

// const Balance = styled.p`
// 	font-size: 20px;
// 	font-weight: 700;
// `;

const NewAccountContainer = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	width: 100%;
	height: 100%;

	background: transparent;

	padding: -20px;
`;

const Label = styled.span`
	font-size: 16px;
	svg {
		font-size: 32px;
	}
`;
