import React from 'react';
import styled from 'styled-components';
import { MdDarkMode, MdLogout, MdSunny } from 'react-icons/md';
import { IconButton } from '@/ui/components';
import { useSystemTheme } from '@/ui/hooks/useSystemTheme';
import { useNavigate } from 'react-router-dom';
import { signOut } from '@/application/services/auth';

interface HeaderProps {
	pageName: string;
}

export const Header: React.FC<HeaderProps> = ({ pageName }) => {
	const navigate = useNavigate();
	const { theme, changeTheme } = useSystemTheme();

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
`

const PageName = styled.h2`

`

const OptionsContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;

	width: 60%;
`
