import { Operacao } from '@/application/models';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface TimelineProps {
	operacoes: Operacao[];
}

type DayResult = {
    date: string;
    operacoes: Operacao[];
    sum: number;
};

type WeekResult = {
    week: number;
    days: DayResult[];
    sum: number;
};

const getWeekNumber = (date: Date): number => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - startOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
};

const prepareTimelineData = (operacoes: Operacao[]) => {
	    // Agrupar as operações por data
		const groupByDate = (operacoes: Operacao[]): { [key: string]: Operacao[] } => {
			return operacoes.reduce((acc, operacao) => {
				const dateStr = new Date(operacao.dataEntrada).toISOString().split('T')[0];
				if (!acc[dateStr]) {
					acc[dateStr] = [];
				}
				acc[dateStr].push(operacao);
				return acc;
			}, {} as { [key: string]: Operacao[] });
		};

		const groupedByDate = groupByDate(operacoes);

		// Ordenar cada grupo por horário de entrada
		for (const date in groupedByDate) {
			groupedByDate[date].sort((a, b) => a.dataEntrada.getTime() - b.dataEntrada.getTime());
		}

		// Calcular somatório por dia e organizar por semanas
		const weeks: { [key: number]: WeekResult } = {};
		Object.keys(groupedByDate).forEach(date => {
			const operacoes = groupedByDate[date];
			const daySum = operacoes.reduce((sum, operacao) => sum + (operacao.alvo - operacao.precoEntrada), 0);
			const dateObj = new Date(date);
			const weekNumber = getWeekNumber(dateObj);

			if (!weeks[weekNumber]) {
				weeks[weekNumber] = { week: weekNumber, days: [], sum: 0 };
			}

			weeks[weekNumber].days.push({ date, operacoes, sum: daySum });
			weeks[weekNumber].sum += daySum;
		});

		// Ordenar semanas e dias
		const orderedWeeks = Object.values(weeks).sort((a, b) => a.week - b.week);
		orderedWeeks.forEach(week => {
			week.days.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
		});

		return orderedWeeks;
}

export const Timeline: React.FC<TimelineProps> = ({ operacoes }) => {

	const [timelineData, setTimelineData] = useState<WeekResult[]>(prepareTimelineData(operacoes));
	console.log(operacoes);

	useEffect(() => {
		console.log('timelineData', timelineData)
	}, [timelineData])


	return (
		<Container>
			{timelineData.map(week => (
				<Week key={week.week}>
					{week.days.map(days => (
						<Days key={Math.random()}>
							{days.operacoes.map(operacao => (
								<Day key={operacao.id}>
									<Column>
										{days.date}
									</Column>
									<Column>
										{operacao.ativo.acronimo}
									</Column>

									<Column>
										{operacao.quantidade}
									</Column>

									<Column>
										{operacao.tipo}
									</Column>

									<Column>
										{operacao.precoEntrada}
									</Column>

									<Column>
										{operacao.stopLoss}
									</Column>

									<Column>
										{operacao.alvo}
									</Column>

									<Column>
										{operacao.precoSaida}
									</Column>

									<Column>
										{format(operacao.dataEntrada, 'HH:mm')}
									</Column>

									<Column>
										{operacao.dataSaida && format(operacao.dataSaida, 'HH:mm')}
									</Column>
								</Day>
							))}
						</Days>
					))}
					<Days>
						<TotalDay>0,00</TotalDay>
					</Days>
					<TotalWeek>100</TotalWeek>
				</Week>
			))}
			{/* <Week>
				<Days>
					{operacoes.map(operacao => <Day>{operacao.dataEntrada.toLocaleString()}</Day>)}
					<TotalDay>0,00</TotalDay>
				</Days>
				<TotalWeek>0,00</TotalWeek>
			</Week> */}
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;

	width: 100%;

	/* border: 1px solid white; */
`

const Week = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;

	width: 100%;


	border: 1px solid gray;
`

const TotalWeek = styled.div`
	border: 1px solid aqua;
`

const Days = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;

	width: 100%;

	margin: 10px 0;

	border: 1px solid red;
`

const Day = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: row;
	gap: 5px;

	width: 100%;

	border: 1px solid green;
`

const Column = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;

	min-width: 50px;
	height: 40px;

	border: 1px solid white;

`


const TotalDay = styled.div`
	border: 1px solid blue;
`
