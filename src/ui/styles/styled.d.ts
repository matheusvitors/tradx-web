import 'styled-components';

/**
 * Este arquivo serve para sobrescrever a tipagem DefaultTheme no styled-component do sistema
 */

interface CommomProps {
	background: string;
	text: string;
}

declare module 'styled-components' {
    export interface DefaultTheme {
		name: string,

		colors: {
			primary: string;
			secondary: string;
			accent: string;
			black: string;
			white: string;
			gray: string;

			success: string,
			attention: string,
			warning: string,

			green: string;
			red: string;
		}

		common: {
			background: string,
			text: string;
			positive: CommomProps;
			negative: CommomProps;
		},

		sidebar: {
			border: string,
			default: CommomProps;
			active: CommomProps;
			hover: CommomProps;
		},

		button: {
			background: string,
			text: string,
			hover: CommomProps;
		},

		accountCard: {
			background: string,
			text: string,
			shadowColor: string;
			selected: {
				background: string,
				text: string,
				shadowColor: string;
			}
		},

		input: {
			background: string,
			border: string,
			text: string,
		},

		modalPage: {
			background: string;
			text: string;
			shadowColor: string;
		},

		table: {
			borderRow: string;
			borderCell: string;
		},
	};
}
