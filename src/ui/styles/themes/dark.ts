const primary = '#7f32fb'
const secondary = '#20d3ee'
const accent = '#CAFFD0'
const black = '#120623'
const white = '#F8F1F5'
const gray= '#c7c3c3'
const background = '#080014';

const dark = {
	name: 'dark',

	primary,
	secondary,
	accent,
	black,
	white,
	gray,

	common: {
		background,
		// background: black,
		text: white
	},

	semantic: {
		success: '#46B93C',
		attention: '#f2f230',
		warning: '#C92020',
	},

	login: {
		background: black,
		text: white
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
