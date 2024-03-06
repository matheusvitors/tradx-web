import React from 'react';
import { IconType } from 'react-icons';
import styled from 'styled-components';
import { hexToRGBA } from "about-colors-js";

interface FloatingButtonProps {
	icon: IconType;
	label?: string;
	onClick: () => void;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ( { icon: Icon, label, onClick }) => {
	return (
		<Btn $withLabel={label && label.length > 0 ? true : false } onClick={onClick}>
			<Icon />
			{label}
		</Btn>
	);
}

const Btn = styled.button<{ $withLabel?: boolean; }>`
	display: flex;
	align-items: center;
	justify-content: space-evenly;

	position: fixed;
	padding: ${props => props.$withLabel ? '20px' : '0px'};

	width: ${props => props.$withLabel ? 'auto' : '60px'};
	height: 60px;

	bottom: 30px;
	right: 30px;

	background-color: ${props => props.theme.button.background};
	border-radius: ${props => props.$withLabel ? '60px' : '50%'};;
	box-shadow: 0px 0px 20px ${props => props.theme.card.spread} ${(props) => hexToRGBA(props.theme.button.background, 0.45)};

	text-align: center;
	font-size: 16px;
	color: ${props => props.theme.button.text};

	transition: all .5s;

	svg {
		fill: ${props => props.theme.button.text};
		font-size: 32px;
	}

	&:hover {
		background-color: ${props => props.theme.button.hover.background};
		color: ${props => props.theme.button.hover.text};
		svg {
			fill: ${props => props.theme.button.hover.text};
		}

	}

`
