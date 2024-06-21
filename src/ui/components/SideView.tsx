import { IconButton } from '@/ui/components';
import React, { PropsWithChildren } from 'react';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';

interface SideViewProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

//TODO: Deixar a animação de entrada suave

export const SideView: React.FC<PropsWithChildren<SideViewProps>> = ({ open, setOpen, children }) => {
	return (
		<Container open={open}>
			<IconButton icon={MdClose} onClick={() => setOpen(false)} />
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
