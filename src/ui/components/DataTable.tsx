import React from "react";
import styled, { css } from "styled-components";
import { IconType } from "react-icons";
import { IconButton } from "@/ui/components";

/**
 * Referencia => https://stackoverflow.com/questions/73001042/how-i-do-to-access-key-of-nested-object-in-my-interface-with-type-generics
 */

type Join<K extends string, P extends string> = `${K}${"" extends P ? "" : "."}${P}`;

type Paths<T> = T extends object
		? {
			[K in keyof T]-?: K extends string ? `${K}` | Join<K, Paths<T[K]>> : never;
		}[keyof T]
	: never;

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
	acessor: Paths<T>;
	width?: string;
}

export const DataTable: React.FC<DataTableProps> = ({ columns, payload }) => {
	//TODO: Resolver bug do background transparente nas actions
	// https://www.google.com/search?q=access+nested+atribute+using+string&sca_esv=a62499659915de61&sxsrf=ACQVn09YWAUlKx8JO2S-Kh_Q2LvwMp5dfQ%3A1710625455266&ei=rxL2ZfHoD_yI4dUP54yE0A8&udm=&ved=0ahUKEwix_Oq04PmEAxV8RLgEHWcGAfoQ4dUDCBA&uact=5&oq=access+nested+atribute+using+string&gs_lp=Egxnd3Mtd2l6LXNlcnAiI2FjY2VzcyBuZXN0ZWQgYXRyaWJ1dGUgdXNpbmcgc3RyaW5nMgkQIRgKGKABGApIniFQrQZY3R5wAngBkAEAmAH1AaABwR2qAQYwLjkuMTC4AQPIAQD4AQGYAhCgAoUYwgIKEAAYRxjWBBiwA8ICBxAjGLACGCfCAgYQABgWGB7CAgYQIRgVGAqYAwDiAwUSATEgQIgGAZAGCJIHBjIuMy4xMaAHwWA&sclient=gws-wiz-serp

	const Actions: React.FC<Omit<DataTablePayload, "data">> = ({ actions }) => {
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
		<Table>
			<Row>
				{columns.map((column: Column<any>, i: number) => (
					<HeaderCell key={i} $width={column.width}>
						{column.name}
					</HeaderCell>
				))}
			</Row>
			{payload.map(({ data, actions }: DataTablePayload, i: number) => (
				<Row key={i}>
					{columns.map((column: Column<any>, i: number) => (
						<Cell key={i} $width={column.width}>
							{column.acessor.includes('.') ? data[column.acessor.split('.')[0]][column.acessor.split('.')[1]] : data[column.acessor]}
							{i + 1 === columns.length && actions && <Actions actions={actions} key={Math.random()} />}
						</Cell>
					))}
				</Row>
			))}
		</Table>
	);
};

const defaultCell = css`
	height: 45px;
	padding: 0 20px;
	vertical-align: middle;
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
		background: linear-gradient(90deg, transparent, 0%, transparent, 50%, ${(props) => props.theme.common.background});
		display: flex;
	}
`;
