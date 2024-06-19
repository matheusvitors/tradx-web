import React from 'react';
import styled from 'styled-components';

export const SideView: React.FC = () => {
	return (
		<Container open>
			oi
		</Container>
	);
}


const Container = styled.div<{ open: boolean;}>`
	display: flex;
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

	transition: transform 0.3s ease-in-out;
	transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};

	background: ${props => props.theme.common.background};

	border: 1px solid yellow;

`
