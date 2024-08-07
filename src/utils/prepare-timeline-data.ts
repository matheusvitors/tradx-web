import { Operacao } from "@/application/models";

export type DayResult = {
    date: string;
    operacoes: Operacao[];
    sum: number;
};

export type WeekResult = {
    week: number;
    days: DayResult[];
    sum: number;
};

const getWeekNumber = (date: Date): number => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - startOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
};

export const prepareTimelineData = (operacoes: Operacao[]) => {
	// Agrupar as operações por data
	const groupByDate = (operacoes: Operacao[]): { [key: string]: Operacao[] } => {
		return operacoes.reduce((acc, operacao) => {
			const dateStr = new Date(operacao.dataEntrada).toISOString().split('T')[0];
			if (!acc[dateStr]) {
				acc[dateStr] = [];
			}
			acc[dateStr].push(operacao);
			return acc;
		}, {} as { [key: string]: Operacao[] });
	};

	const groupedByDate = groupByDate(operacoes);

	// Ordenar cada grupo por horário de entrada
	for (const date in groupedByDate) {
		groupedByDate[date].sort((a, b) => a.dataEntrada.getTime() - b.dataEntrada.getTime());
	}

	// Calcular somatório por dia e organizar por semanas
	const weeks: { [key: number]: WeekResult } = {};
	Object.keys(groupedByDate).forEach(date => {
		const operacoes = groupedByDate[date];
		const daySum = operacoes.reduce((sum, operacao) => sum + (operacao.alvo - operacao.precoEntrada), 0);
		const dateObj = new Date(date);
		const weekNumber = getWeekNumber(dateObj);

		if (!weeks[weekNumber]) {
			weeks[weekNumber] = { week: weekNumber, days: [], sum: 0 };
		}

		weeks[weekNumber].days.push({ date, operacoes, sum: daySum });
		weeks[weekNumber].sum += daySum;
	});

	// Ordenar semanas e dias
	const orderedWeeks = Object.values(weeks).sort((a, b) => a.week - b.week);
	orderedWeeks.forEach(week => {
		week.days.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
	});

	return orderedWeeks;
}
