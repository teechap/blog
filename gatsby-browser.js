import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import 'normalize.css';

const theme = {
    grid: {
        breakpoints: {
            mobile: 480,
            tablet: 768,
            desktop: 1024,
            large: 1280,
            xLarge: 1440
        }
    }
};

exports.wrapRootComponent = ({ Root }) => () => (
    <ThemeProvider theme={theme}>
        <Root />
    </ThemeProvider>
);
