import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { isTokenExpired } from '@/application/services';
import { Header, Sidebar } from '@/ui/layouts';

interface PageProps {
	children: ReactNode;
	withGrow?: boolean;
	pageName: string;
}

export const Page: React.FC<PageProps> = ({ children, withGrow, pageName }) => {

	const navigate = useNavigate();

	useEffect(() => {
		if(isTokenExpired()){
			navigate('/login');
		}
	}, [])

	return (
		<Container>
			<Sidebar />
			<Content>
				<Header pageName={pageName} />
				<ChildrenContainer withGrow={withGrow}>
					{ children }
				</ChildrenContainer>
			</Content>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	min-width: 100%;
	min-height: 100vh;

	transition: all .3s;
`

const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;

	width: calc(100% - 250px);
	min-height: 100vh;
`

const ChildrenContainer = styled.div<{ withGrow?: boolean}>`
	display: flex;
	flex-grow: 1;

	width: 100%;
	padding: 20px;
`
