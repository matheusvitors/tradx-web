import React, { useEffect, useState } from "react";
import styled, { css, useTheme } from "styled-components";
import { IconType } from "react-icons";
import {hexToRGBA} from 'about-colors-js'
import { usePagination } from "@/ui/hooks";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Paths } from "@/application/types";
import { IconButton } from "@/ui/components/general";

/**
 * Referencia => https://tanstack.com/table/latest
 */

//TODO: Refatorar como um composition pattern

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
	style?: React.CSSProperties;
	color?: string;
}

export interface Column<T> {
	name: string;
	acessor: Paths<T>;
	width?: string;
	visibility?: boolean;
}

export const DataTable: React.FC<DataTableProps> = ({ columns, payload }) => {
	const { currentPage, totalPages, firstPage, lastPage, nextPage, prevPage, paginate } = usePagination();
	const theme = useTheme();

	const [items, setItems] = useState<any>([]);

	const textColor:  Record<string, string> = {
		'green': theme.colors.green,
		'red': theme.colors.red,
		'orange': theme.colors.orange,
		'neutral': theme.common.text,
		'error': theme.colors.warning,
		'lost': theme.colors.gray

	};

	useEffect(() => {
		setItems(paginate(payload));
	}, [payload, currentPage])

	const Actions: React.FC<Omit<DataTablePayload, "data" | "color">> = ({ actions }) => {
		return (
			<>
				{actions && actions.length > 0 && (
					<ActionsContainer>
						{actions.map((action: DataTableActionConfig) => (
							<IconButton key={Math.random()} icon={action.icon} onClick={action.callback} color={action.color} size={20} margin={10} />
						))}
					</ActionsContainer>
				)}
			</>
		);
	};

	return (
		<Container>
			<TableContainer>
				<Table>
					<Row>
						{columns.map((column: Column<any>, i: number) => (
							column.visibility !== false &&
							<HeaderCell key={i} $width={column.width} $display={column.visibility ?? true}>
								{/* <a style={{cursor: 'pointer', display: 'block'}} onClick={() => console.log(column.name)}>{column.name}</a> */}
								{column.name}
							</HeaderCell>
						))}
					</Row>
					{items.map(({ data, actions, style, color }: DataTablePayload, i: number) => (
						<Row key={i} $backgroundColor={(color === 'lost' || color === 'error') ? textColor[color] : undefined}>
							{columns.map((column: Column<any>, i: number) => (
								column.visibility !== false &&
								<Cell style={style} key={i} $width={column.width} $color={color ? textColor[color] : textColor['neutral']}>
									{column.acessor.includes('.') ? data[column.acessor.split('.')[0]][column.acessor.split('.')[1]] : data[column.acessor]}
								</Cell>
							))}
							<Actions actions={actions} key={i}/>
						</Row>
					))}
				</Table>
			</TableContainer>

			{ totalPages > 1 &&
				<PaginationContainer>
					<IconButton icon={MdKeyboardDoubleArrowLeft} onClick={firstPage} />
					<IconButton icon={MdKeyboardArrowLeft} onClick={prevPage} />
					<span>Página {currentPage} de {totalPages}</span>
					<IconButton icon={MdKeyboardArrowRight} onClick={nextPage} />
					<IconButton icon={MdKeyboardDoubleArrowRight} onClick={lastPage} />
				</PaginationContainer>
			}
		</Container>

	);
};

const defaultCell = css`
	height: 45px;
	padding: 0 20px;
	vertical-align: middle;
`;

const Container = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;

	width: 100%;
	height: 90%;
`

const TableContainer = styled.div`
	width: 100%;
	height: 100%;
`;

const Table = styled.div`
	display: table;
	width: 100%;

	border-collapse: collapse;
`;

const HeaderCell = styled.div<{ $width?: string; $display?: boolean; }>`
	${defaultCell}
	display: ${props => props.$display ?  'table-cell' : 'none'} ;

	text-align: start;
	font-weight: 700;
	font-size: 14px;

	width: ${(props) => props.$width || "auto"};
`;

const Row = styled.div<{ $backgroundColor?: string; }>`
	display: table-row;

	border-bottom: 1px solid ${(props) => props.theme.table.borderRow};

	width: 100%;

	position: relative;

	background-color: ${props => hexToRGBA(props.$backgroundColor, 0.2) || 'transparent'};
	color: ${props => props.theme.common.text};
`;

const Cell = styled.div<{ $width?: string; $color: string }>`
	${defaultCell}
	display: table-cell;

	width: ${(props) => props.$width || "auto"};
	position: relative;

	font-size: 14px;
	color: ${props => props.$color};

	border-bottom: 1px solid ${(props) => props.theme.table.borderCell};
`;

const ActionsContainer = styled.div`
	display: none;

	width: 100%;
	height: 100%;
	padding-right: 20px;

	position: absolute;
	top: 0;
	left: 0;

	${Row}:hover & {
		background: linear-gradient(90deg, transparent 0%, ${(props) => hexToRGBA(props.theme.common.background, 0.9)} 70%, ${(props) => props.theme.common.background} 100%);
		/* background: linear-gradient(90deg, transparent, 0%, transparent, 70%, ${(props) => props.theme.common.background}); */
		display: flex;
		align-self: flex-end;
		align-items: center;
		justify-content: flex-end;
	}
`;

const PaginationContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	align-self: flex-end;
	gap: 20px;

	width: 100%;
	height: 60px;
	margin-top: 15px;
`
