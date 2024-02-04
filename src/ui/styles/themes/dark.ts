const primary = '#190933'
const secondary = '#665687'
// const accent = '#88e85e'
const black = '#141414'
const white = '#fcfcfc'


const dark = {
	name: 'dark',

	common: {
		background: black,
		text: white
	},

	semantic: {
		success: '#46B93C',
		attention: '#218aa4',
		warning: '#C92020',
	},

	login: {
		background: black,
		text: white
	},

	sidebar: {
		border: white,
		default: {
			background: black,
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
			background: secondary,
			text: black,
		}
	},

	card: {
		background: white,
		text: black,
	},

	textInput: {
		background: primary,
		border: white,
		text: white,
	},

}

export default dark;
