import React, { ComponentProps } from 'react';
import styled, { useTheme } from 'styled-components';

interface ChipProps extends ComponentProps<'span'> {
	text: string;
	type?: 'primary' | 'secondary' | 'accent' | 'positive' | 'negative';
}

export const Chip: React.FC<ChipProps> = ({ text, type, ...props }) => {

	const theme = useTheme();

	const colorSchema = {
		'primary': {
			backgroundColor: theme.colors.primary,
			color: theme.common.text
		},
		'secondary': {
			backgroundColor: theme.colors.primary,
			color: theme.common.text
		},
		'accent': {
			backgroundColor: theme.accent,
			color: theme.common.background
		},
		'positive': {
			backgroundColor: theme.common.positive.background,
			color: theme.common.positive.text
		},
		'negative': {
			backgroundColor: theme.common.negative.background,
			color: theme.common.negative.text
		},
	}

	return (
		<Container $colorschema={colorSchema[type || 'primary']}  {...props}>{text}</Container>
	);
}

const Container = styled.span<{ $colorschema: {backgroundColor: string; color: string;} }>`
	padding: 5px 10px;
	min-width: 50px;

	background-color: ${props => props.$colorschema.backgroundColor};
	color: ${props => props.$colorschema.color};

	font-size: 12px;

	border-radius: 10px;
`
