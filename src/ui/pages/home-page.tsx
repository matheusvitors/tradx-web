import React, { useEffect, useState } from 'react';
import { Page } from '@/ui/layouts';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/infra/config/constants';
import { getDashboardInformations } from '@/application/services/dashboard';
import { Conta, Operacao } from '@/application/models';
import { storage } from '@/infra/store/storage';
import { KEY_CONTA_SELECIONADA } from '@/infra/config/storage-keys';
import { Loading, Toast } from '@/ui/components/feedback';
import { AccountCard } from '@/ui/components/dashboard';

interface DashboardInformations {
	contas: Conta[];
	variacao: number[];
	operacoes: Operacao[];
}

export const HomePage: React.FC = () => {

	const [selectedConta, setSelectedConta] = useState('');

	const { data, isLoading, error } = useQuery<DashboardInformations>({
		queryKey: ['dashboard'],
		queryFn: () => getDashboardInformations(selectedConta),
		staleTime: STALE_TIME,
		enabled: selectedConta ? true : false
	});

	useEffect(() => {
		(async () => {
			const data = storage.get(KEY_CONTA_SELECIONADA)?.data;
			data && setSelectedConta(data);
		})()
	}, [])

	useEffect(() => {
		error && Toast.error(error.message)
	}, [error])

	return (
		<Page pageName='Home'>
			<Content>
				<ContasContainer>
					{isLoading && <Loading visible={isLoading} />}
					{data && data.contas.map(conta => <AccountCard key={conta.id} conta={conta} selected={selectedConta === conta.id} />)}
				</ContasContainer>

				<RelatoriosContainer>
					relatorios
				</RelatoriosContainer>

				<OperacoesContainer>
					{data && data.operacoes.map(operacao => <div>{operacao.ativo.acronimo}</div>)}
				</OperacoesContainer>
			</Content>
		</Page>
	);
}

const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	width: 100%;
`


const ContasContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 20px;

	width: 100%;
	height: 20%;

	/* border: 1px solid red; */
`

const RelatoriosContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 50%;

	border: 1px solid green;

`

const OperacoesContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 30%;

	border: 1px solid blue;

`

