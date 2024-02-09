import React, { useEffect, useState } from "react";
import { Conta } from "@/application/models";
import { Page } from "@/ui/layouts";
import { AccountCard, Loading, NewAccountCard, Toast } from "@/ui/components";
import { listContas } from "@/application/services/contas";
import styled from "styled-components";
import { NovaContaPage } from "@/ui/pages";

export const ContasPage: React.FC = () => {
	const [contas, setContas] = useState<Conta[]>([]);
	const [loading, setLoading] = useState(false);
	const [openModal, setOpenModal] = useState(false);

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

	const onCloseWindow = () => {
		setOpenModal(false);
		loadContas();
	}

	return (
		<Page>
			<Content>
				<h1>Contas</h1>
				<ContasContainer>
					{contas.map((conta) => (<AccountCard key={conta.id} conta={conta} />))}
					<NewAccountCard setOpen={() => setOpenModal(true)}  />
					<NovaContaPage open={openModal} closeWindow={onCloseWindow} />
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
