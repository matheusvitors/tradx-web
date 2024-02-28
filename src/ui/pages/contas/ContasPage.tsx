import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { Conta } from "@/application/models";
import { Page } from "@/ui/layouts";
import { AccountCard, NewAccountCard, PageLoading, Toast } from "@/ui/components";
import { listContas, removeConta } from "@/application/services/contas";
import { STALE_TIME } from "@/infra/config/constants";

export const ContasPage: React.FC = () => {

	const navigate = useNavigate();
	const location = useLocation();
	const { data, isLoading, error, refetch } = useQuery<Conta[]>({
		queryKey: ['contas'],
		queryFn: listContas,
		staleTime: STALE_TIME
	})

	const [contas, setContas] = useState<Conta[]>([]);

	useEffect(() => {
		data && setContas(data);
	}, [data])

	useEffect(() => {
		error && Toast.error(error.message);
	}, [error])

	// const [loading, setLoading] = useState(false);

	// useEffect(() => {
	// 	loadContas();
	// }, []);

	// const loadContas = async () => {
	// 	try {
	// 		setLoading(true);
	// 		const data = await listContas();
	// 		data.length >= 0 && setContas(data);
	// 	} catch (error: any) {
	// 		Toast.error(error.message);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// }

	const onEdit = (conta: Conta) => {
		navigate('/contas/editar', { state: {background: location, conta: conta}})
	}

	const onRemove = async (conta: Conta) => {
		Toast.confirm(
			'Excluir Conta?',
			`Deseja excluir a conta [ ${conta.nome} ]?`,
			'Excluir',
			async () => {await onRemoveConta(conta.id); refetch()},
		)
	}

	const onRemoveConta = async (id: string) => {
		try {
			await removeConta(id)
		} catch (error: any) {
			Toast.error(error.message);
		}
	}

	return (
		<Page>
			<Content>
				<h1>Contas</h1>
				<ContasContainer>
					<NewAccountCard />
					{contas.map((conta) => (<AccountCard key={conta.id} conta={conta} onEdit={() => onEdit(conta)} onRemove={() => onRemove(conta)} />))}
				</ContasContainer>
				<PageLoading visible={isLoading} />
			</Content>
		</Page>
	);
};

const Content = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-direction: column;
	flex-grow: 1;
`;

const ContasContainer = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 25px;

	padding-top: 20px;

	width: 100%;
	height: auto;
`;
