import React from 'react';
import styled from 'styled-components';
import { MdDarkMode, MdLogout, MdSunny } from 'react-icons/md';
import { IconButton } from '@/ui/components';
import { useSystemTheme } from '@/ui/hooks/useSystemTheme';
import { useNavigate } from 'react-router-dom';
import { signOut } from '@/application/services/auth';


export const Header: React.FC = () => {
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
			<IconButton icon={theme === 'light' ? MdSunny : MdDarkMode} onClick={handleToggleTheme}/>
			<IconButton onClick={handleLogout} size={30} icon={MdLogout} />
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
