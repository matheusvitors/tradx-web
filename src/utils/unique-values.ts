interface AnyObject {
	[key: string]: any;
}

export interface UniqueValues {
	[key: string]: any;
}

function isDateField(field: string): boolean {
	return field.toLowerCase().includes("data") || field.toLowerCase().includes("date");
}

function getNestedUniqueValues<T extends AnyObject, K extends keyof T>(array: T[], field: K, nestedFields: (keyof T[K])[]): { [NK in keyof T[K]]?: T[K][NK][] } {
	const uniqueValues: { [NK in keyof T[K]]?: T[K][NK][] } = {};

	nestedFields.forEach((nestedField) => {
		uniqueValues[nestedField] = array.map((item) => item[field]?.[nestedField]).filter((value, index, self) => self.indexOf(value) === index);
	});

	return uniqueValues;
}

export function uniqueValues<T extends AnyObject>(array: T[], fields: (keyof T)[]): UniqueValues {
	const uniqueValues: UniqueValues = {};

	fields.forEach((field) => {
		if (array[0][field] && typeof array[0][field] === "object" && !Array.isArray(array[0][field])) {
			uniqueValues[field as string] = getNestedUniqueValues(array, field, Object.keys(array[0][field]) as (keyof T[keyof T])[]);
		} else if (isDateField(field as string)) {
			const dates = array.map((item) => new Date(item[field])).filter((date) => !isNaN(date.getTime()));
			if (dates.length > 0) {
				const minDate = new Date(Math.min(...dates.map((date) => date.getTime())));
				const maxDate = new Date(Math.max(...dates.map((date) => date.getTime())));
				uniqueValues[field as string] = { min: minDate.toISOString(), max: maxDate.toISOString() };
			}
		} else {
			uniqueValues[field as string] = array.map((item) => item[field]).filter((value, index, self) => self.indexOf(value) === index);
		}
	});

	return uniqueValues;
}
