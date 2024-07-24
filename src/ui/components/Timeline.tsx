import React from 'react';
import styled from 'styled-components';


const data = [
	{
		ativo: 'MAUM1',
		tipo: 'compra',
		entrada: 10,
		stopLoss: 5,
		alvo: 20,
		saida: 20,
		data: '2024-07-20',
		horario: {
			entrada: '14:40',
			saida: '15:00'
		}
	},
	{
		ativo: 'MAUM1',
		tipo: 'compra',
		entrada: 10,
		stopLoss: 5,
		alvo: 20,
		saida: 20,
		data: '2024-07-20',
		horario: {
			entrada: '14:40',
			saida: '15:00'
		}
	},
	{
		ativo: 'MAUM1',
		tipo: 'compra',
		entrada: 10,
		stopLoss: 5,
		alvo: 20,
		saida: 20,
		data: '2024-07-21',
		horario: {
			entrada: '14:40',
			saida: '15:00'
		}
	},
	{
		ativo: 'MAUM1',
		tipo: 'compra',
		entrada: 10,
		stopLoss: 5,
		alvo: 20,
		saida: 20,
		data: '2024-07-22',
		horario: {
			entrada: '14:40',
			saida: '15:00'
		}
	},
	{
		ativo: 'MAUM1',
		tipo: 'compra',
		entrada: 10,
		stopLoss: 5,
		alvo: 20,
		saida: 20,
		data: '2024-07-22',
		horario: {
			entrada: '14:40',
			saida: '15:00'
		}
	},

]


export const Timeline: React.FC = () => {
	return (
		<Container>

		</Container>
	);
}


const Container = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;

	width: 100%;

	border: 1px solid white;
`
