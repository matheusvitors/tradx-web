import { Store, StoreData } from "@/application/interfaces";

export const LocalStorageStore: Store = {
	get: (key: string): any | null => {
		const savedData = localStorage.getItem(key);

		if(savedData) {
			const parsedData: StoreData = JSON.parse(savedData);

			if(!parsedData.expiration || (parsedData.expiration && parsedData.expiration > Date.now())){
				return parsedData.data;
			}
			return null
		}

		return null;
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
