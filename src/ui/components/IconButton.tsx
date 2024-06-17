import React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons';

interface IconButtonProps {
	icon: IconType;
	onClick: () => void;
	size?: number;
	backgroundColor?: string;
	color?: string;
	margin?: number;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon: Icon, onClick, size, backgroundColor, color, margin}) => {

	return (
		<Button
			onClick={onClick}
			size={size || 32}
			$backgroundColor={backgroundColor}
			color={color}
			$margin={margin}
		>
			<Icon size={size || 32} />
		</Button>
	);
}

const Button = styled.button<{ size?: number; color?: string; $margin?: number; $backgroundColor?: string; }>`
	background: ${props => props.$backgroundColor || 'transparent'} ;
	width: ${props => props.size ? props.size + 5 + 'px' : '38px'};
	height: ${props => props.size ? props.size + 4 + 'px' : '36px'};

	margin: ${props => props.$margin ? props.$margin+'px' : '15px'};

	border-radius: 5px;

	transition: all .7s;

	&:hover {
		svg {
			fill: ${props => props.color || props.theme.button.hover.background};
		}
	}
`

