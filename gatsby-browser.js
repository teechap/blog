import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import 'normalize.css';
import { theme } from './theme';

exports.wrapRootComponent = ({ Root }) => () => (
    <ThemeProvider theme={theme}>
        <Root />
    </ThemeProvider>
);
