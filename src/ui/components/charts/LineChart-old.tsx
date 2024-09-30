import React from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Chart: React.FC = () => {

	const data = [
		{data: '21/01', value: 5, variacao: 'R$ 5,00'},
		{data: '21/01', value: 7, variacao: 'R$ 7,00'},
		{data: '22/01', value: 12.5, variacao: 'R$ 12,50'},
		{data: '22/01', value: 9, variacao: 'R$ 9,00'},
		{data: '23/01', value: 15, variacao: 'R$ 15,00'},
		{data: '24/01', value: 12, variacao: 'R$ 12,00'},
		{data: '24/01', value: 18, variacao: 'R$ 18,00'},
	]

	const CustomToolTip = ({payload, label, active}: {payload: any, label: string; active: boolean}) => {

		return (
			<>
				{active && <>
					<div>
						<p>{label}</p>
						<p>{payload[0].payload.variacao}</p>
						<p></p>
					</div>
				</>}
			</>
		)
	}

	return (
		<ResponsiveContainer width="100%" height="95%">
		{/* <ResponsiveContainer width="100%" height="95%" style={{border: '1px solid red'}}> */}
			<LineChart data={data} margin={{top: 5, right: 25, bottom: 5, left: 5}}>
				<Line type="natural" dataKey="value" stroke="#8884d8"/>
				<XAxis dataKey="data" />
				{/* <YAxis dataKey="value" /> */}
				{/* <Tooltip
					content={<CustomToolTip />}
				/> */}
				<Tooltip
					labelStyle={{ color: 'green'}}
					contentStyle={{ background: 'black', color: 'red'}}
					itemStyle={{color: 'red'}}
					wrapperStyle={{color: 'brown'}}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
};
