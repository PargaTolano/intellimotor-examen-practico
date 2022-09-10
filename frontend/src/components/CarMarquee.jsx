import React, { useMemo } from 'react';

import { Box }  from '@mui/material';

import { css, keyframes } from '@emotion/css';

import car1 from '../assets/car-404px.png';
import car2 from '../assets/convertible-404px.png';
import car3 from '../assets/sports-car-404px.png';

const cars= [ car1, car2, car3 ];

const carAnimation = keyframes`
    0% {
        transform: translateX(-33%);
    }
    25% {
        transform: translateX(0%);
    }
    50% {
        transform: translateX(33%);
    }
    75% {
        transform: translateX(66%);
    }
    100% {
        transform: translateX(100%);
    }
`;

const getStyles=()=>({
    carMarquee: css`
        display:        flex;
        position:       fixed;
        top:            0;
        left:           0;
        width:          100vw;
        height:         100vh;
        padding:        0;
        align-items:    flex-end;
        white-space:    nowrap;
        overflow:       hidden;
        box-sizing:     border-box;
    `,
    marqueeContent: css`
        position:       absolute;
        width:          300vw;
        display:        flex;
        right:          0;
        bottom:         0;
        flex-flow:      row nowrap;
        animation:      ${carAnimation} 10s ease infinite;
    `,
    car: css`
        width:          ${100/cars.length}%;
        height:         10rem;
        flex:           0 0 auto;
        display:        inline-block;
        object-fit:     contain;
        @media (min-width: 800px) {
            height: 13rem;
        }
    `,
    road: css`
        position:   absolute;
        bottom:     0;
        left:       0;
        width:      100%;
        height:     6rem;
        background-color: #3B3B3F;
    `
});

const CarMarquee = () => {

    // crear y obtener clases una vez
    const classes=useMemo(getStyles, []);

    return (
        <Box className={classes.carMarquee}>
            <Box className={classes.road}/>
            <div className={classes.marqueeContent}>
                {cars.map(x=><img key={x} className={classes.car} src={x} alt='imagen de auto'/>)}
            </div>
        </Box>
    );
};

export default CarMarquee;