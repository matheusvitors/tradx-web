import React, { useEffect, useState } from 'react';
import { storage } from '@/infra/store/storage';

export const usePersistentState = <T extends any>(key: string, defaultValue: T): [T , React.Dispatch<React.SetStateAction<T>>] => {

	const [state, setState] = useState<T>(storage.get(key) || defaultValue);

	useEffect(() => {
		storage.set(key, state);
	}, [state]);

	return [state, setState]

}
