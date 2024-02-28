import React from "react";
import styled, { css, useTheme } from "styled-components";
import { FaPlus } from "react-icons/fa6";
import { hexToRGBA } from "about-colors-js";
import { Conta } from "@/application/models";
import { Link, useLocation } from "react-router-dom";
import { IconButton } from "@/ui/components";
import { MdDelete, MdEdit } from "react-icons/md";

interface AccountCardProps {
	conta: Conta;
	onEdit: () => void;
	onRemove: () => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({ conta, onEdit, onRemove }) => {

	const theme = useTheme();

	return (
		<Container $isReal={conta.tipo === 'real' ? true : false}>
			<Content>
				<Name>{conta.nome}</Name>
				<Balance>R$ {conta.saldo.toFixed(2)}</Balance>
			</Content>
			<ActionsContent>
				<IconButton icon={MdEdit} size={22} onClick={onEdit} color={theme.semantic.attention} margin={5} />
				<IconButton icon={MdDelete} size={22} onClick={onRemove} color={theme.semantic.warning} margin={5} />
			</ActionsContent>
		</Container>
	);
};

export const NewAccountCard: React.FC = () => {

	const location = useLocation();

	return (
		<Container $new={true}>
			<NewAccountContainer to='/contas/adicionar' state={{background: location}}>
				<Label><FaPlus /></Label>
				<Label>Nova Conta</Label>
			</NewAccountContainer>
		</Container>
	);
};

const Container = styled.div<{ $new?: boolean; $isReal?: boolean; }>`
	display: flex;
	align-items: flex-start;
	justify-content: space-evenly;
	flex-direction: row;

	width: 250px;
	height: 100px;
	padding: 10px;

	/* border-left: 3px solid aqua; */
	${props => !props.$new && css`
		border-left: 3px solid;
		border-left-color: ${props.$isReal ? props.theme.account.real : props.theme.account.simulador} ;
	` }

	box-shadow: 0px 0px 20px ${props => props.theme.card.spread} ${(props) => hexToRGBA(props.theme.card.shadowColor, 0.45)};
	border-radius: 10px;
	background: ${props =>  props.$new ? props.theme.card.background : hexToRGBA(props.theme.card.background, 0.3)};
`;

const Content = styled.div`
	width: 92%;
	height: 100%;

	${Container}:hover & {
		width: 70%;
	}
`

const Name = styled.p`
	font-size: 16px;
	font-weight: 300;
`;

const Balance = styled.p`
	font-size: 20px;
	font-weight: 700;

	margin-top: 20px;
`;

const ActionsContent = styled.div`
	display: none;
	align-items: center;
	justify-content: center;
	flex-direction: row;

	width: 18%;

	${Container}:hover & {
		display: flex;
	}

	/* border: 1px solid silver; */

`

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
	font-size: 18px;
	svg {
		font-size: 32px;
	}
`;
