import { format } from "date-fns";
import { Period, RangeData } from "@/application/interfaces";

export const periodToRange = (period?: Period): RangeData => {
	const range: RangeData = { init: '', end: '' };

	const initDate = new Date(period?.year || new Date().getFullYear(), period?.month || 0, 1);
	const endDate = new Date(period?.year || new Date().getFullYear(), period?.month !== undefined ? period.month + 1 : 12, 0);

	range.init = format(initDate, 'yyyy-MM-dd');
	range.end = format(endDate, 'yyyy-MM-dd');

	return range;
}
