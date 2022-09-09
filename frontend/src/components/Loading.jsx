import React from 'react';
import useLoading from '../hooks/loading';

import {
    Backdrop,
    CircularProgress
} from '@mui/material';

export const Loading = () => {
    const { visible } = useLoading();
    return (
        <Backdrop open={visible} sx={{zIndex: 2}}>
            <CircularProgress/>
        </Backdrop>
    );
};

export default Loading;
