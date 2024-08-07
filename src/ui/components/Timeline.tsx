import { Operacao } from '@/application/models';
import { prepareTimelineData, WeekResult } from '@/utils/prepare-timeline-data';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

interface TimelineProps {
	operacoes: Operacao[];
}

export const Timeline: React.FC<TimelineProps> = ({ operacoes }) => {

	const [timelineData, setTimelineData] = useState<WeekResult[]>(prepareTimelineData(operacoes));
	const [items, setItems] = useState(timelineData[timelineData.length -1 ]);
	console.log('op', timelineData[timelineData.length -1 ]);

	const columns = ['Data',  'Ativo', 'Tipo', 'Entrada', 'Stop Loss', 'Alvo', 'Saída', 'Horario - Entrada', 'Horário - Saída'];

	useEffect(() => {
		console.log('timelineData', timelineData)
	}, [timelineData])

	return (
		<Container>
			<TableContainer>
				<Table>
					<Row>
						{columns.map((column: string, i: number) => (
							<HeaderCell key={i} >
								{column}
							</HeaderCell>
						))}
					</Row>

				</Table>
			</TableContainer>
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
const defaultCell = css`
	height: 45px;
	padding: 0 20px;
	vertical-align: middle;
`;


const TableContainer = styled.div`
	width: 100%;
	height: 100%;
`;

const Table = styled.div`
	display: table;
	width: 100%;

	border-collapse: collapse;
`;

const HeaderCell = styled.div<{ $width?: string }>`
	${defaultCell}
	display: table-cell;
	text-align: start;
	font-weight: 700;

	width: ${(props) => props.$width || "auto"};
`;

const Row = styled.div`
	display: table-row;
	border-bottom: 1px solid ${(props) => props.theme.table.borderRow};
`;

const Cell = styled.div<{ $width?: string }>`
	${defaultCell}
	display: table-cell;

	width: ${(props) => props.$width || "auto"};
	position: relative;

	border-bottom: 1px solid ${(props) => props.theme.table.borderCell};
`;


