import 'styled-components';

/**
 * Este arquivo serve para sobrescrever a tipagem DefaultTheme no styled-component do sistema
 */

declare module 'styled-components' {
    export interface DefaultTheme {
		name: string,

		primary: string;
		secondary: string;
		accent: string;
		black: string;
		white: string;
		gray: string;

		common: {
			background: string,
			text: string
		},

		semantic: {
			success: string,
			attention: string,
			warning: string,
		},

		login: {
			background: string,
			text: string
		},

		sidebar: {
			border: string,
			default: {
				background: string,
				text: string
			},
			active: {
				background: string,
				text: string
			},
			hover: {
				background: string,
				text: string
			},
		},

		button: {
			background: primary,
			text: string,
			hover: {
				background: primary,
				text: string,
			}
		},

		card: {
			background: string,
			text: string,
			shadowColor: string;
			spread: string;
		},

		textInput: {
			background: string,
			border: string,
			text: string,
		},

		link: {
			text: string;
			hover: string;
		},

		modalPage: {
			background: string;
			text: string;
			shadowColor: string;
		}

	};
}
