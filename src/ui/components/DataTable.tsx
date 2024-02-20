import React from 'react';

/**
 * Referencia => https://tanstack.com/table/latest
 */

interface DataTableProps {
	columns: string[];
	data: any;
}

export const DataTable: React.FC = () => {
// export const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>coluna 1</th>
					<th>coluna 2</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>celula 1</td>
					<td>celula 2</td>
				</tr>
				<tr>
					<td>celula 3</td>
					<td>celula 4</td>
				</tr>
			</tbody>

		</table>
	);
}
