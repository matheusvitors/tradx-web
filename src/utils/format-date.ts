export const formatDate = (date: Date) => {
	return new Date(date.getTime() - 10800000).toISOString().slice(0,16);
}
