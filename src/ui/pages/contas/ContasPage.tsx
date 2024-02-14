import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Conta } from "@/application/models";
import { Page } from "@/ui/layouts";
import { AccountCard, Loading, NewAccountCard, Toast } from "@/ui/components";
import { listContas, removeConta } from "@/application/services/contas";

export const ContasPage: React.FC = () => {

	const navigate = useNavigate();
	const location = useLocation();

	const [contas, setContas] = useState<Conta[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		loadContas();
	}, []);

	const loadContas = async () => {
		try {
			setLoading(true);
			const data = await listContas();
			data.length >= 0 && setContas(data);
		} catch (error: any) {
			Toast.error(error.message);
		} finally {
			setLoading(false);
		}
	}

	const onEdit = (id: string) => {
		navigate('/contas/editar/'+id, { state: {background: location}})
	}

	const onRemove = async (conta: Conta) => {
		Toast.confirm(
			'Excluir Conta?',
			`Deseja excluir a conta [ ${conta.nome} ]?`,
			'Excluir',
			async () => {await onRemoveConta(conta.id); loadContas()},
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
					{contas.map((conta) => (<AccountCard key={conta.id} conta={conta} onEdit={() => onEdit(conta.id)} onRemove={() => onRemove(conta)} />))}
				</ContasContainer>
				<LoadingContainer $visible={loading}>
					<Loading visible={loading} />
				</LoadingContainer>
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

const LoadingContainer = styled.div<{ $visible: boolean }>`
	display: ${({ $visible }) => ($visible ? "flex" : "none")};
	align-items: center;
	justify-content: center;
	flex-grow: 1;

	width: 100%;
	height: 100%;
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
