import {createTheme} from '@material-ui/core';

const theme = createTheme({
	palette: {
		primary: {
			main: '#a1c181ff', // olivine
		},
		secondary: {
			main: '#233d4dff', // charcoal
		},
		error: {
			main: '#fe7f2dff', // pumpkin
		},
		warning: {
			main: '#fcca46ff', // sunglow
		},
		info: {
			main: '#619b8aff', // polished-pine
		},
	},
	typography: {
		fontFamily: `"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif`,
		fontSize: 14,
		h1: {
			fontWeight: 500,
			fontSize: '1.2rem',
			margin: '12px',
		},
	},
	fabStyle: {
		position: 'relative',
		top: -62,
		right: -310,
		color: '#a1c181ff',
		size: 'small',
	},
});

export default theme;
