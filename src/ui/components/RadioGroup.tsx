import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface RadioGroupProps extends PropsWithChildren {
	width?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ width, children }) => {
	return (
		<Container $width={width}>
			{children}
		</Container>
	);
}

const Container = styled.div<{ $width?: string; }>`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: row;
	gap: 10px;

	width: ${props => props.$width || '80%'};
`;
