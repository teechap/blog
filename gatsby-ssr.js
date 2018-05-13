import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { renderToString } from 'react-dom/server';
import { theme } from './theme';

exports.onRenderBody = ({ setHeadComponents }) => {
    setHeadComponents([
        <script type="text/javascript" key="paper" src="https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.11.5/paper-core.min.js"></script>
    ])
};

exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
    const themed = (
        <ThemeProvider theme={theme}>
            {bodyComponent}
        </ThemeProvider>
    );
    replaceBodyHTMLString(renderToString(themed));
};
