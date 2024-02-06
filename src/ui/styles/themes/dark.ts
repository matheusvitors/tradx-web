// const primary = '#2af3a9'
// const secondary = '#fbbf34'
// const black = '#162731'
// const white = '#fcfcfc'

const primary = '#7f32fb'
const primaryLight = '#BB96ED'
// const primaryDark = '#000'
const secondary = '#20d3ee'
// const accent = '#CAFFD0'
const black = '#120623'
const white = '#F8F1F5'


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
		background: primaryLight,
		text: white,
		shadowColor: white
	},

	textInput: {
		background: primary,
		border: white,
		text: white,
	},

	link: {
		text: white,
		hover: secondary,
	},


}

export default dark;
