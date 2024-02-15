import { StoreData } from "@/application/interfaces";
import { PropsWithChildren, createContext, useContext } from "react";

/**
 * referencia: https://dev.to/nisabmohd/create-your-own-api-fetching-caching-mechanism-in-react-49oc
 */
interface CacheContextProps {
	get: (key: string) => any;
	set: (key: string, data: any, ttl: string) => void;
	clear: () => void;
	remove: (key: string) => void;
}

interface cacheData {
	key: string;
	payload: any;
	expiration: Date
}

const CacheContext = createContext<CacheContextProps | null>(null);

export const CacheProvider: React.FC<PropsWithChildren> = ({ children }) => {

	let cacheData: cacheData[] = []

	const get = (key: string) => {

		const data = cacheData.find(item => item.key === key);

		if(!data) {
			return undefined;
		}

		if(new Date().getTime() > data.expiration.getTime()) {
			cacheData = cacheData.filter(item => item.key !== key);
		}

		return data.payload;
	}

	const set = (key: string, data: any) => {

	}

	const clear = () => {

	}

	const remove = (key: string) => {

	}

	return (
		<CacheContext.Provider value={{get, set, clear, remove}}>
			{children}
		</CacheContext.Provider>
	)
}

export const useCache = () => {
	return useContext(CacheContext) as CacheContextProps;
}
