import { useState } from "react";

export const usePagination = () => {
	const totalPerPage = 13;
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	const paginate = (array: any[]) => {
		setTotalPages(Math.trunc(array.length / totalPerPage < 1 ? 1 : (array.length / totalPerPage) + 1));

		if (array.length / totalPerPage < 1) {
			return array;
		}

		// console.log('slice', totalPerPage * currentPage - totalPerPage, totalPerPage * currentPage);

		return array.slice(totalPerPage * currentPage - totalPerPage, totalPerPage * currentPage);
	};

	const onChangePage = (page: number) => {
		if (page > 0 && page < totalPages + 1) {
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

	const lastPage = () => {
		onChangePage(totalPages);
	}

	return { currentPage, totalPages, lastPage, nextPage, prevPage, firstPage, paginate };
};
