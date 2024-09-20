import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { css, styled, useTheme } from 'styled-components';
import { hexToRGBA } from "about-colors-js";
import { SystemName } from '@/ui/components/general';


export const Sidebar: React.FC = () => {

	const theme = useTheme();
	const location = useLocation();

	const paths = [
		{ label: 'Home',	path: '/home' },
		{ label: 'Operações',	path: '/operacoes' },
		{ label: 'Ativos',	path: '/ativos' },
		{ label: 'Contas',	path: '/contas' },
	]

	return (
		<Container>
			<HeaderSidebar>
				<SystemName color={theme.common.text || 'red'} width='150' height='100' />
				{/* <SystemName /> */}
			</HeaderSidebar>

			{ paths.map(item => <MenuItem key={item.path} to={location.pathname === item.path ? '#' : item.path} active={(location.pathname === item.path).toString()}>{item.label}</MenuItem>)}
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;

	width: 250px;
	min-height: 100vh;

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

const MenuItem = styled(Link)<{ active?: string; }>`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 90%;
	height: 50px;

	margin: 10px 0;

	border-radius: 10px;

	background-color: ${props => props.theme.sidebar.default.background};
	color: ${props => props.theme.sidebar.default.text};

	cursor: pointer;

	transition: all .3s ;

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
