import React, { useEffect, useState } from 'react';
import { Page } from '@/ui/layouts';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/infra/config/constants';
import { getDashboardInformations } from '@/application/services/dashboard';
import { Conta, Operacao } from '@/application/models';

interface DashboardInformations {
	contas: Conta[];
	variacao: number[];
	operacoes: Operacao[];
}

export const HomePage: React.FC = () => {

	const { data, isLoading, error, refetch } = useQuery<DashboardInformations>({
		queryKey: ['dashboard'],
		queryFn: getDashboardInformations,
		staleTime: STALE_TIME
	});

	const [contas, setContas] = useState<Conta[]>([]);
	const [relatorios, setRelatorios] = useState<number[]>([]);
	const [operacoes, setOperacoes] = useState<Operacao[]>([]);

	useEffect(() => {
		if(data){
			setContas(data.contas);
			setRelatorios(data.variacao);
			setOperacoes(data.operacoes);
		}
	}, [data])

	return (
		<Page pageName='Home'>
			<Content>
				<ContasContainer>
					contas
				</ContasContainer>

				<RelatoriosContainer>
					relatorios
				</RelatoriosContainer>

				<OperacoesContainer>
					operacoes
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
	justify-content: center;

	width: 100%;
	height: 20%;

	border: 1px solid red;
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

