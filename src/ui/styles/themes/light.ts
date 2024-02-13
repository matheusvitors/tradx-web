const primary = '#593C8F'
const secondary = '#171738'
const accent = '#6247AA'
const black = '#141414'
const white = '#F6F1F9'
const gray= '#c7c3c3'


const light = {
	name: 'light',

	primary,
	secondary,
	accent,
	black,
	white,
	gray,


	common: {
		background: white,
		text: black
	},

	semantic: {
		success: '#31cb00',
		attention: '#CCC900',
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
		shadowColor: black,
		spread: '-8px',
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
