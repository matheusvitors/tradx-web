import React, { PropsWithChildren } from 'react';
import { MdClose } from 'react-icons/md';
import styled, { useTheme } from 'styled-components';
import { IconButton } from '@/ui/components/general';

interface SideViewProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	title?: string;
}

//TODO: Deixar a animação de entrada suave

export const SideView: React.FC<PropsWithChildren<SideViewProps>> = ({ open, setOpen, title, children }) => {
	const theme = useTheme();

	return (
		<Container open={open}>
			<Header>
				<CloseContainer>
					<IconButton icon={MdClose} margin={1} color={theme.colors.warning} onClick={() => setOpen(false)} />
				</CloseContainer>
				<Title>{title}</Title>
			</Header>

			{children}
		</Container>
	);
}

const Container = styled.div<{ open: boolean; }>`
	display: ${({ open }) => open ? 'flex' : 'none'};
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	align-self: flex-start;

	gap: 20px;

	width: 350px;
	height: calc(100% - 70px);

	margin-top: -20px;
	padding: 10px;

	position: absolute;
	right: 0;
	z-index: 10;

	transition: all 0.3s;
	transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};

	background: ${props => props.theme.common.background};

	border-left: 1px solid ${props => props.theme.secondary};

	overflow-x: hidden;
	white-space: nowrap;
`

const Header = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	width: 100%;
	height: 70px;
`

const Title = styled.h2`
	display: flex;
	justify-content: flex-start;
	align-items: center;

	width: 90%;
	height: 100%;

	padding-left: 20px;
`

const CloseContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;

	width: 20%;
`
