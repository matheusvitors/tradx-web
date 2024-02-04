import { createGlobalStyle } from 'styled-components';


export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box; /** borda não aumenta o tamanho do elemento */
		font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
			Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
		color: ${props => props.theme.common.text};
	}


	html, body, #root {
		background-color: ${props => props.theme.common.background};
		height: 100%;
	}

    *, button, input {
        border: 0;
        outline: 0;
        font-family: 'Roboto', sans-serif;
    }

    button {
        cursor: pointer;
    }

	a {
		color: inherit;
		text-decoration: none;
	}

	@media (prefers-color-scheme: dark) {
	html {
		color-scheme: dark;
	}
	body {
		color: white;
	}

}
`;
