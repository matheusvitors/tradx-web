interface AnyObject {
	[key: string]: any;
}

export const uniqueValues = <T extends AnyObject>(array: T[], fields: (keyof T)[]): { [K in keyof T]?: T[K][] | { min: T[K], max: T[K] } } => {
	const uniqueValues: { [K in keyof T]?: T[K][] } = {};

	fields.forEach((field) => {
		uniqueValues[field] = array.map((item) => item[field]).filter((value, index, self) => self.indexOf(value) === index);
	});

	return uniqueValues;
};

[
	{ item: 123, type: "number" },
	{ item: "jose", type: "string" },
	{ item: "joao", type: "string" },
	{ item: 554, type: "number" },
	{ item: "2024-06-20 11:50", type: "date" },
];
