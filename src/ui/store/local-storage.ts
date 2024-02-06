import { Store, StoreData } from "@/application/interfaces";

export const LocalStorageStore: Store = {
	get: (key: string): StoreData | null => {
		const data = localStorage.getItem(key);
		return data ? JSON.parse(data) : null;
	},

	set: function (key: string, data: string, expiration?: number): void {
		const payload: StoreData = {
			data,
			expiration: expiration || null
		}
		localStorage.setItem(key, JSON.stringify(payload));
	},

	remove: function (key: string): void {
		localStorage.removeItem(key);
	}
}
