const primary = '#190933'
const secondary = '#665687'
const accent = '#B084CC'
const black = '#141414'
const white = '#fcfcfc'

const light = {
	name: 'light',

	common: {
		background: white,
		text: black
	},

	semantic: {
		success: '#31cb00',
		attention: '#f2f230',
		warning: '#C92020',
	},

	login: {
		background: white,
		text: black
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
			text: black,
		}
	},

	card: {
		background: white,
		text: black,
	},

	textInput: {
		background: primary,
		border: black,
		text: black,
	},

}

export default light;
