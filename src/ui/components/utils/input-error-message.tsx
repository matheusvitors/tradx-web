import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

export const InputErrorMessage: React.FC<PropsWithChildren> = ({children}) => {
	return (
		<ErrorMessage>{children}</ErrorMessage>
	);
}

const ErrorMessage = styled.span`
	width: 100%;
	height: 20px;
	margin: 3px 0;

	font-size: 12px;
	color: ${props => props.theme.colors.warning}
`
