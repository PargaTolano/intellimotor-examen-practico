import React from 'react';

import { Box, Link } from '@mui/material'

const FooterComp = () => {
    return (
        <Box 
            sx={{backgroundColor: '#3B3B3F'}} 
            color='white' 
            paddingBottom={2} 
            flex='0 0 auto' 
            textAlign='center'
        >
            iconos <Link href='https://loading.io/icon/swsirj'>sports-car</Link>, <Link href='https://loading.io/icon/8b47in'>car</Link>, <Link href='https://loading.io/icon/1boqpo'>covertible</Link> from loading.io
        </Box>
    );
};

export default FooterComp;