import { Loading } from '@/ui/components';
import React from 'react';
import styled from 'styled-components';

interface PageLoadingProps {
	visible: boolean;
}

export const PageLoading: React.FC<PageLoadingProps> = ({ visible }) => {
	return (
		<Container $visible={visible}>
			<Loading visible={visible} />
		</Container>
	);
}

const Container = styled.div<{ $visible: boolean }>`
	display: ${({ $visible }) => ($visible ? "flex" : "none")};
	align-items: center;
	justify-content: center;
	flex-grow: 1;

	width: 100%;
	height: 100%;
`;
