/**
 * Referencia => https://stackoverflow.com/questions/73001042/how-i-do-to-access-key-of-nested-object-in-my-interface-with-type-generics
 */

type Join<K extends string, P extends string> = `${K}${"" extends P ? "" : "."}${P}`;

export type Paths<T> = T extends object
		? {
			[K in keyof T]-?: K extends string ? `${K}` | Join<K, Paths<T[K]>> : never;
		}[keyof T]
	: never;

