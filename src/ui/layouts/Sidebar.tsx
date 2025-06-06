import React, { Dispatch, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { css, styled, useTheme } from 'styled-components';
import { hexToRGBA } from "about-colors-js";
import { MdDashboard, MdLabelOutline, MdOutlineAccountBalanceWallet, MdOutlineInsertChart } from 'react-icons/md';
import { SystemName } from '@/ui/components/general';
import project from '../../../package.json';
import logo from '@/ui/assets/icon.png';

interface SidebarProps {
	open: boolean;
	setOpen: Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ open }) => {

	const theme = useTheme();
	const location = useLocation();

	const SIZE = 28;

	const paths = [
		// { label: 'Home',	path: '/home', icon: <MdDashboard size={SIZE} /> },
		{ label: 'Operações',	path: '/operacoes', icon: <MdOutlineInsertChart size={SIZE} /> },
		{ label: 'Ativos',	path: '/ativos', icon: <MdLabelOutline size={SIZE} /> },
		{ label: 'Contas',	path: '/contas', icon: <MdOutlineAccountBalanceWallet size={SIZE} /> },
	]

	return (
		<Container $isopen={open}>
			<HeaderSidebar>
				{open ? <SystemName color={theme.common.text || 'red'} width='150' height='100' /> :
					<img width={40} src={logo}/> }
			</HeaderSidebar>

			<Content>
				{ paths.map(item =>
					<MenuItem $isopen={open} key={item.path} to={location.pathname === item.path ? '#' : item.path} active={(location.pathname === item.path).toString()}>
						<MenuIcon $isopen={open}>{item.icon}</MenuIcon>
						<Label $isopen={open}>{item.label}</Label>
					</MenuItem>)}
			</Content>
			<Footer>
				<FooterText>{project.version}</FooterText>
			</Footer>
		</Container>
	);
}

export const useSidebar = () => {
	const [isOpenSidebar, setIsOpenSidebar] = useState(true);

	return { isOpenSidebar, setIsOpenSidebar}
}

const Container = styled.div<{ $isopen: boolean; }>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;

	min-width: ${({ $isopen }) => ($isopen ? "250px" : "60px")};
	min-height: 100vh;

	transition: min-width 0.5s ease;

	border-right: 1px solid ${props => props.theme.sidebar.border};
`

const HeaderSidebar = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	align-self: flex-start;

	width: 100%;
	height: 70px;

	margin-bottom: 30px;
`

const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;

	width: 100%;
	height: 80vh;
`

const MenuItem = styled(Link)<{ active?: string; $isopen: boolean; }>`
	display: flex;
	align-items: center;
	justify-content: ${({ $isopen }) => ($isopen ? 'flex-start' : 'center')};
	gap: 10px;

	width: 90%;
	height: 50px;
	padding-left: ${({ $isopen }) => ($isopen ? '10px' : '0')};
	/* padding-left: 10px; */

	margin: 10px 0;

	border-radius: 10px;

	background-color: ${props => props.theme.sidebar.default.background};
	color: ${props => props.theme.sidebar.default.text};

	cursor: pointer;

	transition: all .3s ease;

	${props => props.active === 'true' && css`
		background-color: ${props => props.theme.sidebar.active.background};
		color: ${props => props.theme.sidebar.active.text};
		box-shadow: 0px 0px 20px 4px ${props => hexToRGBA(props.theme.sidebar.active.background, 0.45)};
	`}

	&:hover {
		background-color: ${props => props.theme.sidebar.hover.background};
		color: ${props => props.theme.sidebar.hover.text};
	}
`

const Label = styled.span<{ $isopen: boolean; }>`
	display: ${({ $isopen }) => ($isopen ? 'flex' : 'none')};
	align-items: center;

	width: ${({ $isopen }) => $isopen ? '80%' : '0%'};
	height: 100%;

	transition: width 0.5s ease;
`

const MenuIcon = styled.div<{ $isopen: boolean; }>`
	display: flex;
	align-items: center;
	justify-content: center;

	width: ${({ $isopen }) => $isopen ? '15%' : '100%'};
	height: 100%;

	padding: 0;

	/* background-color: aliceblue; */
`

const Footer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	align-self: flex-end;

	width: 100%;
	height: 70px;
`

const FooterText = styled.span`
	font-size: 10px;
	color: ${props => props.theme.common.text};

`
