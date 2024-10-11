import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MdDarkMode, MdLogout, MdSunny } from 'react-icons/md';
import { useSystemTheme } from '@/ui/hooks/useSystemTheme';
import { useNavigate } from 'react-router-dom';
import { signOut } from '@/application/services/auth';
import { IconButton } from '@/ui/components/general';
import { useSelectedConta } from '@/ui/contexts';

interface HeaderProps {
	pageName: string;
	showAccount?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ pageName, showAccount }) => {
	const navigate = useNavigate();
	const { theme, changeTheme } = useSystemTheme();
	const { selectedConta } = useSelectedConta();
	console.log(selectedConta);


	const handleLogout = () => {
		signOut();
		navigate('/login');
	}

	const handleToggleTheme = () => {
		theme === 'light' ? changeTheme('dark') : changeTheme('light');
	}

	return (
		<Container>
			<TitleContainer>
				<PageName>{pageName}</PageName>
			</TitleContainer>

			<TitleContainer>
				<PageName>{selectedConta?.nome}</PageName>
			</TitleContainer>

			<OptionsContainer>
				<IconButton icon={theme === 'light' ? MdSunny : MdDarkMode} onClick={handleToggleTheme}/>
				<IconButton onClick={handleLogout} size={30} icon={MdLogout} />
			</OptionsContainer>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	align-self: flex-start;

	width: 100%;
	height: 70px;

	padding-right: 20px;

	border-bottom: 1px solid ${props => props.theme.sidebar.border};
`

const TitleContainer = styled.div`
	width: 40%;
	padding: 20px;

	border: 1px solid white;
`

const PageName = styled.h2`

`

const OptionsContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;

	width: 20%;

	border: 1px solid white;
`
