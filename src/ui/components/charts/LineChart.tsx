import React from 'react';
import { PointTooltipProps, ResponsiveLine } from '@nivo/line';
import { useTheme } from 'styled-components';

export interface Serie {
    id: string | number
    data: SerieData[]
    [key: string]: any
}

export interface SerieData {
	x?: string | number | Date;
	y?: string | number | Date;
	[key: string]: any
}


interface LineChartProps {
	series: Serie[];
}

export const LineChart: React.FC<LineChartProps> = ({ series }) => {

	const theme = useTheme();

	// const data: Serie[] = [{
	// 	id: 'variação',
	// 	data: [
	// 		{y: 1.50, x: '01/02'},
	// 		{y: 3.25, x: '02/02'},
	// 		{y: 2.10, x: '03/02'},
	// 		{y: 5.70, x: '04/02'},
	// 		{y: 7.60, x: '05/02'},
	// 		{y: 6.10, x: '08/02'},
	// 	]
	// }]

	return (
		<div style={{width: '98%', height: '95%'}}>
			{series.length === 0 ?
				<>
					Não há dados para serem mostrados.
				</>
			:
				<ResponsiveLine
					data={series}
					margin={{ top: 70, right: 100, bottom: 60, left: 45 }}
					curve="monotoneX"
					animate

					enableGridX={false}
					enableGridY={false}
					xScale={{ type: 'point' }}
					yScale={{
						type: 'linear',
						min: 'auto',
						max: 'auto',
					}}
					colors={[`${theme.colors.secondary}`]}
					lineWidth={1}

					isInteractive
					enableCrosshair={true}
					useMesh={true}

					tooltip={({point}:PointTooltipProps) => (
						<div style={{
							background: `${theme.common.background}`,
							border: `1px solid ${theme.colors.primary}`,
							padding: '10px',
							borderRadius: '10px',
						}} >
							{/* <div>{point.data.xFormatted.toString()}</div> */}
							<div style={{color: `${theme.colors.secondary}`}}>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(parseFloat(point.data.yFormatted.toString()))}</div>
						</div>
					)}
				/>
			}
		</div>
	);
}
