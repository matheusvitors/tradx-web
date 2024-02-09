import React from 'react';
import { Page } from '@/ui/layouts';
import styled from 'styled-components';

export const AtivosPage: React.FC = () => {
	return (
		<Page>
			<Content>
				<h1>Ativos</h1>
				<Filters></Filters>
				<TableContainer>

				</TableContainer>
			</Content>
		</Page>
	);
}

const Content = styled.div`

`

const Filters = styled.div`

`

const TableContainer = styled.div`

`
