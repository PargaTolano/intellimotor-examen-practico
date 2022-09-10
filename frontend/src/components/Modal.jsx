import React    from 'react';
import useModal from '../hooks/modal';

import {
    Dialog,
    DialogActions,
    Link,
} from '@mui/material';

import { css } from '@emotion/css';

import car1 from '../assets/car-404px.png';

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
            maxWidth='lg'
            bgcolor='black'
            fullWidth
        >
            <img
                className={css`width: 100%;`}
                src={screenshotURL ?? car1} 
                alt='screenshot del anuncio'
            />
            <DialogActions sx={{justifyContent: 'center'}}>
                <Link
                    variant='button'
                    href={screenshotURL ?? car1} 
                    download='screenshot-anuncio.png'
                >
                    Descargar
                </Link>
            </DialogActions>
        </Dialog>
    );
};

export default Modal;
