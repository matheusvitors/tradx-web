import React from 'react';
import styled, { css } from 'styled-components';
import { IconButton } from '@/ui/components';
import { IconType } from 'react-icons';

/**
 * Referencia => https://tanstack.com/table/latest
 */

interface DataTableProps {
	columns: Column<any>[];
	payload: DataTablePayload[];
}

export interface DataTableActionConfig {
	icon: IconType;
	callback: () => void;
	color?: string;
}

export interface DataTablePayload {
	data: any;
	actions: DataTableActionConfig[];
}

export interface Column<T> {
	name: string;
	acessor: keyof T;
}


export const DataTable: React.FC<DataTableProps> = ({ columns, payload }) => {


	const Actions: React.FC<Omit<DataTablePayload, 'data'>> = ({ actions }) => {
		return (
			<>
				{ actions && actions.length > 0 &&
					<ActionsContainer>
						{actions.map((action: DataTableActionConfig) =>
							<IconButton key={Math.random()} icon={action.icon} onClick={action.callback} color={action.color} size={20} margin={10} />
						)}
					</ActionsContainer>
				}
			</>
		)
	}

	return (
		<Table>
			<Row>
				{columns.map(({name})=> <HeaderCell key={name}>{name}</HeaderCell>)}
			</Row>
			{payload.map(({ data, actions }:DataTablePayload, i: number) =>
				<Row key={i}>
					{columns.map((column: Column<any>, i: number) => (
						<Cell key={i}>
							{data[column.acessor]}
							{ ((i === Object.values(column).length) && actions) && <Actions actions={actions} key={Math.random()} /> }
						</Cell>
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
	font-weight: 600;
`

const Row = styled.div`
	display: table-row;
	border-bottom: 1px solid ${props => props.theme.table.borderRow};
`

const Cell = styled.div`
	${defaultCell}
	display: table-cell;

	position: relative;

	border-bottom: 1px solid ${props => props.theme.table.borderCell};
`

const ActionsContainer = styled.div`
	display: none;
	align-items: center;
	justify-content: flex-end;

	width: 100%;
	height: 100%;
	padding-right: 20px;

	position: absolute;

	top: 0;
	left: 0;

	${Row}:hover & {
		background: linear-gradient(90deg, transparent, 0%, transparent, 60%, ${props => props.theme.common.background});
		display: flex;
	}
`



