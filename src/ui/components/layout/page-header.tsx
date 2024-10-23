import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

export const PageHeader: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<Container>
			{children}
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: row;
	gap: 20px;

	width: 100%;
	height: 70px;

	margin-bottom: 5px;

`
