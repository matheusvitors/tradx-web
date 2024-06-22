import { IconButton } from '@/ui/components';
import React, { PropsWithChildren } from 'react';
import { MdClose } from 'react-icons/md';
import styled, { useTheme } from 'styled-components';

interface SideViewProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

//TODO: Deixar a animação de entrada suave

export const SideView: React.FC<PropsWithChildren<SideViewProps>> = ({ open, setOpen, children }) => {
	const theme = useTheme();

	return (
		<Container open={open}>
			<Header>
				<CloseContainer>
					<IconButton icon={MdClose} color={theme.semantic.warning} onClick={() => setOpen(false)} />
				</CloseContainer>
				<Title>Teste</Title>
			</Header>

			{children}
		</Container>
	);
}

const Container = styled.div<{ open: boolean; }>`
	/* display: flex; */
	display: ${({ open }) => open ? 'flex' : 'none'};
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	align-self: flex-start;

	gap: 20px;

	width: 300px;
	height: calc(100% - 70px);

	margin-top: -20px;

	position: absolute;
	right: 0;
	z-index: 10;

	transition: all 0.3s;
	transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};

	background: ${props => props.theme.common.background};

	border: 1px solid yellow;

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

	width: 75%;
	height: 100%;

	padding-left: 20px;
`

const CloseContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`
