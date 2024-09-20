import { DefaultTheme } from "styled-components"
import { hexToRGBA } from 'about-colors-js'

const primary = '#593C8F'
const secondary = '#171738'
const accent = '#006F62'
const black = '#141414'
const white = '#F6F1F9'
const gray= '#c7c3c3'
const green = '#07ad25'
const red = '#bd0606'


export const light: DefaultTheme = {
	name: 'light',

	colors: {
		primary,
		secondary,
		accent,
		black,
		white,
		gray,

		success: '#31cb00',
		attention: '#CCC900',
		warning: '#C92020',

		green,
		red
	},

	common: {
		background: white,
		text: black,
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
		border: black,
		default: {
			background: white,
			text: black
		},
		active: {
			background: primary,
			text: white
		},
		hover: {
			background: secondary,
			text: white
		},
	},

	button: {
		background: primary,
		text: white,
		hover: {
			background: accent,
			text: white,
		}
	},

	accountCard: {
		background: white,
		text: black,
		shadowColor: hexToRGBA(black, 0.4),
		selected: {
			background: primary,
			text: white,
			shadowColor: primary,
		}
	},

	input: {
		background: primary,
		border: black,
		text: black,
	},

	modalPage: {
		background: white,
		text: black,
		shadowColor: black,
	},

	table: {
		borderCell: primary,
		borderRow: secondary,
	},
}

