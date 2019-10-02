import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from 'styled-components';

import { DEFAULT_THEME } from './constants/theme';
import GlobalStyle from './utils/global-style';

ReactDOM.render(
	<ThemeProvider theme={DEFAULT_THEME}>
		<GlobalStyle />
		<App />
	</ThemeProvider>,
	document.getElementById('root'));