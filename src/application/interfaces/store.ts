export interface Store {
	get: (key: string) => StoreData | null;
	set: (key: string, data: any, expiration?: number) => void;
	remove: (key: string) => void;
}

export type StoreData = {
	expiration: number | null;
	data: string;
}
