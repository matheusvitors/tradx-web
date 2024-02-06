import React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons';

interface IconButtonProps {
	icon: IconType;
	onClick: () => void;
	size?: number;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon: Icon, onClick, size, }) => {

	return (
		<Button onClick={onClick} size={size || 32}>
			<Icon size={size || 32} />
		</Button>
	);
}

const Button = styled.button<{size?: number}>`
	background: transparent;
	width: ${props => props.size+'px' || '32px'};
	height: ${props => props.size+'px' || '32px'};

	margin: 15px;

	transition: all .7s;

	&:hover {
		svg {
			fill: ${props => props.theme.button.hover.background};
		}
	}
`

