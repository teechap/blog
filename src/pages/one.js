import React, { Component } from 'react';
import styled from 'react-emotion';
import { withTheme } from 'emotion-theming';

const PREFIX = 'https://seetravisblog.nyc3.digitaloceanspaces.com/18-05-14/';
const IMAGES = [
    { url: `${PREFIX}IMG_8752.jpg`, gridArea: 'a' },
    { url: `${PREFIX}IMG_8745.jpg`, gridArea: 'b' },
    { url: `${PREFIX}IMG_8762.jpg`, gridArea: 'c' },
    { url: `${PREFIX}IMG_8746.jpg`, gridArea: 'd' },
    { url: `${PREFIX}IMG_8772.jpg`, gridArea: 'e' },
    { url: `${PREFIX}IMG_8763-1.jpg`, gridArea: 'f' },
    { url: `${PREFIX}IMG_8755-1.jpg`, gridArea: 'g' },
    { url: `${PREFIX}BZVKE3260.jpg`, gridArea: 'h' }
];

class One extends Component {
    render() {
        return (
            <Grid>
                {IMAGES.map(({ url, gridArea }) => (
                    <GridImage gridArea={gridArea} key={url}>
                        <Image
                            src={url}
                        />
                    </GridImage>
                ))}
            </Grid>
        );
    }
}

const Grid = styled('div')({
    display: 'grid',
    margin: '0 auto',
    marginTop: '140px',
    marginBottom: '140px',
    width: '56vw',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridAutoRows: 'minmax(auto, min-content)',
    gridGap: '15px',
    gap: '15px',
    gridTemplateAreas: `
        "a a b b"
        "a a b b"
        "a a c c"
        "a a c c"
        "d d d d"
        "d d d d"
        "d d d d"
        "d d d d"
        "e e f f"
        "e e f f"
        "e e f f"
        "e e f f"
        "g g g g"
        "g g g g"
        "g g g g"
        "g g g g"
        "h h h h"
        "h h h h"
        "h h h h"
        "h h h h"
    `
}, ({ theme: { grid: { breakpoints } } }) => ({
    [`@media(max-width: ${breakpoints.large}px)`]: {
        width: '70vw',
        marginTop: '60px',
        marginBottom: '60px'
    },
    [`@media(max-width: ${breakpoints.tablet}px)`]: {
        width: '82vw',
        gridGap: '10px',
        gap: '10px',
        marginTop: '50px',
        marginBottom: '50px'
    },
    [`@media(max-width: ${breakpoints.mobile}px)`]: {
        width: '94vw',
        gridGap: '3vw',
        gap: '3vw',
        marginTop: '3vw',
        marginBottom: '3vw'
    }
}));

const GridImage = styled('div')({
}, ({ gridArea }) => ({
    gridArea
}));

const Image = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export default withTheme(One);
