import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Conta } from '@/application/models';
import { listContas } from '@/application/services';
import { KEY_CONTAS } from '@/infra/config/storage-keys';
import { storage } from '@/infra/store/storage';
import { Toast } from '@/ui/components/feedback';
import { Modal } from '@/ui/components/layout';
import { useSelectedConta } from '@/ui/contexts';

export const ContaSelector: React.FC = () => {
	const { selectedConta, setSelectedConta } = useSelectedConta();

	const [isOpenSelector, setIsOpenSelector] = useState(false);
	const [contas, setContas] = useState<Conta[]>([]);

	useEffect(() => {
		loadContas();
	}, [])

	const loadContas = async () => {
		try {
			const cachedContas = storage.get(KEY_CONTAS);
			let contas: Conta[] = [];

			if (cachedContas) {
				contas = JSON.parse(cachedContas);
			} else {
				contas = await listContas();
			}

			setContas(contas);

		} catch (error: any) {
			Toast.error(error.message);
		}
	};

	const ModalSelector = () => {
		return (
			<Modal title='Selecione a Conta' isOpen={isOpenSelector} setIsOpen={() => setIsOpenSelector(!isOpenSelector)}>
				{contas.length > 0 ? (
					<ItemsContainer>
						{contas.map(conta =>
							<Item key={conta.id}
								onClick={() => {console.log('selected', conta); setSelectedConta(conta)}}
								selected={selectedConta?.id === conta.id}
							>
								{conta.nome}
							</Item>
						)}
					</ItemsContainer>
				):
					<></>
				}
			</Modal>
		)
	}

	return (
		<Container onClick={() => setIsOpenSelector(!isOpenSelector)}>
			<Label>{selectedConta?.nome || 'Selecione a conta'}</Label>
			<ModalSelector />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;

	min-height: 70px;
	width: 100%;

	padding: 0 10px;

	cursor: pointer;
`

const Label = styled.span`
	font-size: 22px;
	font-weight: 400;

	color: ${props => props.theme.colors.accent};
`

const ItemsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 20px;

	width: 100%;

`

const Item = styled.div<{ selected?: boolean; }>`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 90%;
	height: 40px;

	background: ${props => props.selected ? props.theme.colors.primary : 'transparent'};

	border: 1px solid ${props => props.theme.colors.primary};
	border-radius: 10px;

	transition: all .5s;

	&:hover{
		border-color: ${props => props.theme.colors.secondary};
		background-color: ${props => props.theme.colors.secondary};
		color: ${props => props.theme.common.text}
	}
`
