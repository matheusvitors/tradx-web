import React from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useTheme } from 'styled-components';

interface LoadingParams {
	visible: boolean;
}

export const Loading: React.FC<LoadingParams> = ({ visible }) => {

	const theme = useTheme()

	return (
			<TailSpin
				height="80"
				width="80"
				color={theme.common.text}
				ariaLabel="tail-spin-loading"
				radius="1"
				visible={visible}
			/>
	);
}
