import React, { useEffect, useState } from 'react';
import { Page } from '@/ui/layouts';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { Ativo } from '@/application/models';
import { listAtivos } from '@/application/services/ativos';
import { STALE_TIME } from '@/infra/config/constants';
import { Button, DataTable, PageLoading, Toast } from '@/ui/components';
import { useNavigate, useLocation } from 'react-router-dom';
export const AtivosPage: React.FC = () => {

	const navigate = useNavigate();
	const location = useLocation();
	const { data, isLoading, error } = useQuery<Ativo[]>({
		queryKey: ['ativos'],
		queryFn: listAtivos,
		staleTime: STALE_TIME
	});

	const [ativos, setAtivos] = useState<Ativo[]>([])

	useEffect(() => {
		data && setAtivos(data);
	}, [data])

	useEffect(() => {
		error && Toast.error(error.message);
	}, [error])


	return (
		<Page>
			<Content>
				<PageHeader>
					<h1>Ativos</h1>
					<Button label='Novo' width='100px' onClick={() => navigate('/ativos/adicionar', { state: {background: location}})} />

				</PageHeader>
				{/* <Filters></Filters> */}
				<TableContainer>
					{/* {ativos.length === 0 && <p>Não há ativos cadastrados.</p>}
					{ativos.length > 0 && ativos.map(ativo => <p key={ativo.id}>{ativo.nome} - {ativo.acronimo}</p>)} */}
					<DataTable />
				</TableContainer>
				<PageLoading visible={isLoading} />
			</Content>
		</Page>
	);
}

const Content = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-direction: column;
	flex-grow: 1;
`

const PageHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: row;
	gap: 20px;

	width: 100%;
	height: 50px;

	margin-bottom: 20px;

	/* border: 1px solid blue; */
`

// const Filters = styled.div`
// 	border: 1px solid blue;
// `

const TableContainer = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-direction: column;
	flex-grow: 1;

	width: 100%;
`
