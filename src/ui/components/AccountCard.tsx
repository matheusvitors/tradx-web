import React from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa6";
import { hexToRGBA } from "about-colors-js";
import { Conta } from "@/application/models";

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

interface NewAccountCardProps {
	setOpen: () => void
}

export const NewAccountCard: React.FC<NewAccountCardProps> = ({ setOpen }) => {
	return (
		<Container>
			<NewAccountContainer onClick={setOpen}>
				<Label><FaPlus /></Label>
				<Label>Nova Conta</Label>
			</NewAccountContainer>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-evenly;
	flex-direction: column;

	width: 250px;
	height: 100px;
	padding: 10px;

	box-shadow: 0px 0px 20px -8px ${(props) => hexToRGBA(props.theme.card.shadowColor, 0.45)};

	border-radius: 10px;

	/* border: 1px solid red; */
`;

const Name = styled.p`
	font-size: 12px;
`;

// const Balance = styled.p`
// 	font-size: 20px;
// 	font-weight: 700;
// `;

const NewAccountContainer = styled.button`
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
