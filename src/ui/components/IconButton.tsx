import React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons';

interface IconButtonProps {
	icon: IconType;
	onClick: () => void;
	size?: number;
	color?: string;
	margin?: number;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon: Icon, onClick, size, color, margin}) => {

	return (
		<Button onClick={onClick} size={size || 32} color={color} $margin={margin}>
			<Icon size={size || 32} />
		</Button>
	);
}

const Button = styled.button<{ size?: number; color?: string; $margin?: number; }>`
	background: transparent;
	width: ${props => props.size+'px' || '32px'};
	height: ${props => props.size+'px' || '32px'};

	margin: ${props => props.$margin ? props.$margin+'px' : '15px'};

	transition: all .7s;

	&:hover {
		svg {
			fill: ${props => props.color || props.theme.button.hover.background};
		}
	}
`

