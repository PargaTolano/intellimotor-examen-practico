import React    from 'react';
import useModal from '../hooks/modal';
import { useRef } from 'react';

import {
    Link, 
    Dialog,
    DialogTitle,
    DialogActions,
    Grid
} from '@mui/material';

import { css } from '@emotion/css';

import car1 from '../assets/car-404px.png';
import exito from '../assets/cheers-250px.png';

export const Modal = ()=>{
    const { 
        visible,
        hide,
        screenshotURL,
        resetScreenshotURL
    } = useModal();

    const onClose=()=>{
        hide();
        resetScreenshotURL();
    };

    return (
        <Dialog         
            PaperProps={{
                style:{ 
                    backgroundColor: `#152B30`, 
                    boxShadow: 'none'
                }
            }}
            open={visible}
            onClose={onClose}
            maxWidth='md'
            bgcolor='black'
            fullWidth
        >
            <DialogTitle variant='h5' color='white' bgcolor='transparent' textAlign='center'>Anuncio Publicado</DialogTitle>
            <Grid container justifyContent='center'>
                <img
                    className={css`
                        width: 100%;
                        @media (min-width: 800px){
                            width:  auto;
                            height: 25rem;
                        }
                    `}
                    src={screenshotURL ?? car1} 
                    alt='screenshot del anuncio'
                />
            </Grid>
            <DialogActions sx={{justifyContent: 'center'}}>
                <Link href={screenshotURL ?? car1} download='screenshot-anuncio.png'>Descargar</Link>
            </DialogActions>
        </Dialog>
    );
};

export default Modal;
