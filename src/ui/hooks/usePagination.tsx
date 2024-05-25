import { useState } from "react";

export const usePagination = <T,>() => {
	const totalPerPage = 15;
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	const paginate = (array: T[]) => {
		setTotalPages(Math.trunc(array.length / totalPerPage < 1 ? 1 : array.length / totalPerPage));
		if (array.length / totalPerPage < 1) {
			return array;
		}

		return array.slice(totalPerPage * currentPage - totalPerPage, totalPerPage * currentPage);
	};

	const onChangePage = (page: number) => {
		if (page > 0 && page < totalPages +1) {
			setCurrentPage(page);
		}
	};

	const prevPage = () => {
		onChangePage(currentPage - 1);
	};

	const nextPage = () => {
		onChangePage(currentPage + 1);
	};

	const firstPage = () => {
		onChangePage(1);
	}

	return { currentPage, totalPages, setTotalPages, nextPage, prevPage, firstPage, paginate };
};
