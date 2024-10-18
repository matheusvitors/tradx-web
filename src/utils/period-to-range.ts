import { Period, RangeData } from "@/application/interfaces";
import { format } from "date-fns";

export const periodToRange = (period?: Period): RangeData => {
	const range: RangeData = { init: '', end: '' };
	let endDate = new Date();

	console.log('init', `${period?.year}-${period?.month ? period.month + 1 : '01'}-01`);


	range.init = format(new Date(`${period?.year}-${period?.month ? period.month + 1 : '01'}-01`).toLocaleString(), 'yyyy-MM-dd');

	if(period) {

	} else {

	}

	return range;
}


	// const range: RangeData = { init: '', end: '' };
	// let endDate = new Date();

	// if(period) {
	// 	if(!period.month && period.year) {
	// 		range.init = format(new Date(`${period?.year}-01-01`), 'yyyy-MM-dd');
	// 		endDate = new Date(`${period?.year}-12-31`);
	// 	} else {
	// 		range.init = format(new Date(`${period?.year}-${period?.month}-01`), 'yyyy-MM-dd');
	// 		endDate = new Date(`${period?.year}-${period.month}-01`);
	// 	}

	// 	endDate.setMonth(endDate.getMonth() + 1);
	// 	console.log({endDate});
	// 	endDate.setDate(0);

	// 	range.end = format(endDate, 'yyyy-MM-dd');
	// } else {
	// 	range.init = format(new Date().setDate(1), 'yyyy-MM-dd');

	// 	const endDate = new Date();
	// 	endDate.setMonth(endDate.getMonth() + 1);
	// 	endDate.setDate(32);
	// 	range.end = format(endDate, 'yyyy-MM-dd');
	// }

	// console.log('range', `${range.init}/${range.end}`);
