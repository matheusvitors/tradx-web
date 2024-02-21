import React from 'react';
import styled, { css } from 'styled-components';

/**
 * Referencia => https://tanstack.com/table/latest
 */

interface DataTableProps {
	columns: Column<any>[];
	data: any;
	options?: DataTableOptions
}

export interface Column<T> {
	name: string;
	acessor: keyof T;
}

export interface DataTableOptions {
	omitFields?: string[]
}

export const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {

	const Actions = () => {
		return (
			<div style={{background: 'red', position: 'absolute', width: '50%', height: '100%', zIndex: 9999}}>
				<button onClick={() => console.log('actions')}>Teste</button>
			</div>
		)
	}

	return (
		<Table>
			<Row>
				{columns.map(({name})=> <HeaderCell key={name}>{name}</HeaderCell>)}
			</Row>
			{data.map((item: any, i: number) =>
				<Row key={Math.random()}>
					{columns.map((column: Column<any>, i: number) => (
						<>
							<Cell key={i}>{item[column.acessor]}

								{(i + 1) === Object.values(column).length && <Actions key={i + 100} /> }
							</Cell>
						</>
					))}
				</Row>
			)}
		</Table>
	);
}

const defaultCell = css`
	height: 45px;
	padding: 0 20px;
	vertical-align: middle;
`

const Table = styled.div`
	display: table;
	width: 100%;

	border-collapse: collapse;
`

const HeaderCell = styled.div`
	${defaultCell}
	display: table-cell;
	text-align: start;
`

const Row = styled.div`
	display: table-row;
	border-bottom: 1px solid aqua;
	position: relative;
`

const Cell = styled.div`
	${defaultCell}
	display: table-cell;

	border: 1px solid red;
`



