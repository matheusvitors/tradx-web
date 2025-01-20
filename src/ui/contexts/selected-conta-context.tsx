import { Conta } from "@/application/models";
import { KEY } from "@/infra/config/storage-keys";
import { storage } from "@/infra/store/storage";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";


interface SelectedContaContextProps {
	selectedConta: Conta | null;
	setSelectedConta: React.Dispatch<React.SetStateAction<Conta | null>>;
}

const DEFAULT_VALUES = {
	selectedConta: null,
	setSelectedConta: () => {}
}

export const SelectedContaContext = createContext<SelectedContaContextProps>(DEFAULT_VALUES);

export const SelectedContaProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [selectedConta, setSelectedConta] = useState<Conta | null>(null);

	useEffect(() => {
		setSelectedConta(storage.get(KEY.CONTA_SELECIONADA));
	}, [])

	useEffect(() => {
		storage.set(KEY.CONTA_SELECIONADA, selectedConta);
	}, [selectedConta])

	return (
		<SelectedContaContext.Provider value={{ selectedConta, setSelectedConta }}>
			{children}
		</SelectedContaContext.Provider>
	);
}

export const useSelectedConta = () => {
	return useContext(SelectedContaContext);
}
