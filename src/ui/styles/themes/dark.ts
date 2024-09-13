import { DefaultTheme } from "styled-components"

const primary = '#7f32fb'
const secondary = '#20d3ee'
const accent = '#CAFFD0'
const black = '#120623'
const white = '#F8F1F5'
const gray= '#c7c3c3'
const green = '#69FF1F'
const red = '#fa0000'
const background = '#080014';

export const dark: DefaultTheme = {
	name: 'dark',

	colors: {
		primary,
		secondary,
		accent,
		black,
		white,
		gray,

		green,
		red,

		success: '#46B93C',
		attention: '#f2f230',
		warning: '#fa0000',
	},

	common: {
		background,
		text: white,
		positive: {
			background: green,
			text: black
		},
		negative: {
			background: red,
			text: white
		}
	},


	sidebar: {
		border: white,
		default: {
			background,
			text: white
		},
		active: {
			background: primary,
			text: white
		},
		hover: {
			background: secondary,
			text: black
		},
	},

	button: {
		background: primary,
		text: white,
		hover: {
			background: accent,
			text: black,
		}
	},

	card: {
		background: primary,
		text: white,
		shadowColor: white,
		spread: '-2px',
	},

	input: {
		background: primary,
		border: white,
		text: white,
	},

	modalPage: {
		background: black,
		text: white,
		shadowColor: white,
	},

	table: {
		borderCell: primary,
		borderRow: secondary,
	},
}
