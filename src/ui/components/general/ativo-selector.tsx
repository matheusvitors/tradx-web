import React, { useEffect, useState } from 'react';
import { Ativo } from '@/application/models';
import { listAtivos } from '@/application/services';
import { KEY } from '@/infra/config/storage-keys';
import { storage } from '@/infra/store/storage';
import { Toast } from '@/ui/components/feedback';
import styled from 'styled-components';
import { Modal } from '@/ui/components/layout';

export const AtivoSelector: React.FC = () => {

	const [isOpen, setIsOpen] = useState(false);
	const [ativos, setAtivos] = useState<Ativo[]>([]);
	const [selectedAtivo, setSelectedAtivo] = useState<Ativo | null>(storage.get(KEY.ATIVO_SELECIONADO) || null);

	useEffect(() => {
		loadAtivos()
	}, [])

	const loadAtivos = async () => {
		try {
			const cachedAtivos = storage.get(KEY.ATIVOS);
			let ativos: Ativo[] = [];

			if(cachedAtivos) {
				ativos = JSON.parse(cachedAtivos)
			} else {
				ativos = await listAtivos();
			}

			setAtivos(ativos);
		} catch (error: any) {
			Toast.error(error.message);
		}
	}

	const selectAtivo = (ativo: Ativo) => {
		setSelectedAtivo(ativo);
		storage.set(KEY.ATIVO_SELECIONADO, ativo);
	}

	const ModalSelector = () => {
		return (
			<Modal title='Selecione o ativo' isOpen={isOpen} setIsOpen={() => setIsOpen(!isOpen)}>
				{ativos.length > 0 ? (
					<ItemsContainer>
						{ativos.map(ativo =>
							<Item key={ativo.id}
								onClick={() => selectAtivo(ativo)}
								selected={selectedAtivo?.id === ativo.id}
							>
								{ativo.acronimo}
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
		<Container onClick={() => setIsOpen(!isOpen)}>
			<Label>{selectedAtivo?.nome || 'Selecione o ativo'}</Label>
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
	width: 30%;

	padding: 0 10px;

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
	flex-direction: row;
	flex-wrap: wrap;
	gap: 20px;

	width: 100%;

`

const Item = styled.div<{ selected?: boolean; }>`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 45%;
	height: 40px;

	background: ${props => props.selected ? props.theme.colors.primary : 'transparent'};

	border: 1px solid ${props => props.theme.colors.primary};
	border-radius: 10px;

	cursor: pointer;

	transition: all .5s;

	&:hover{
		border-color: ${props => props.theme.colors.secondary};
		background-color: ${props => props.theme.colors.secondary};
		color: ${props => props.theme.common.text}
	}
`
