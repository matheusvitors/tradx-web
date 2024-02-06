const primary = '#6247AA'
const secondary = '#102B3F'
const accent = '#062726'
const black = '#141414'
const white = '#F6F1F9'

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
		shadowColor: black
	},

	textInput: {
		background: primary,
		border: black,
		text: black,
	},

	link: {
		text: black,
		hover: secondary,
	},

}

export default light;
