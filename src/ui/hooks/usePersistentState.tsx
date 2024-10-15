import { useState } from 'react'

//TODO: Em desenvolvimento -> https://blog.stackademic.com/react-custom-hook-with-typescript-generic-78a0b72cea08
export const usePersistentState = <T,>(key: string, defaultValue: T): [T, (newValue: T) => void] => {

	const [value, setValue] = useState<T>(defaultValue);


	return [value, setValue]
}
