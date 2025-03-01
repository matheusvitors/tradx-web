import React, { PropsWithChildren, useEffect } from "react";
import { MdClose } from "react-icons/md";
import styled, { useTheme } from "styled-components";
import { hexToRGBA } from "about-colors-js";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@/ui/components/general";
import { isTokenExpired } from "@/application/services";

interface ModalPageProps {
	title: string;
}

export const ModalPage: React.FC<PropsWithChildren<ModalPageProps>> = ({ title, children }) => {
	const navigate = useNavigate();
	const theme = useTheme();

	useEffect(() => {
		isTokenExpired() && navigate('/login');
	}, [])

	return (
		<Container>
			<Card>
				<Header>
					<PageName>{title}</PageName>
					<IconButton icon={MdClose} onClick={() => navigate(-1)} color={theme.colors.warning} />
				</Header>
				<Content>{children}</Content>
			</Card>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 100vw;
	height: 100vh;
	z-index: 0;
	position: absolute;

	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	background-color: rgba(0, 0, 0, 0.4);
`;

const Card = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;

	background-color: ${(props) => props.theme.common.background};

	width: 50%;
	min-height: 25%;
	max-height: 90vh;

	border-radius: 10px;
	box-shadow: 0px 0px 20px -8px ${(props) => hexToRGBA(props.theme.colors.black, 0.45)};
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	height: 20%;
	width: 100%;

	padding: 20px;
`;

const PageName = styled.span`
	display: flex;
	justify-content: flex-start;

	width: 70%;

	font-size: 24px;
`;

const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;

	height: 90%;
	width: 100%;

	padding: 20px;
	margin-bottom: 40px;

	overflow-y: auto;
`;
