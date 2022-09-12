import React    from 'react';
import useModal from '../hooks/modal';

import {
    Dialog,
    DialogContent,
    DialogActions,
    Link,
    Typography,
    Box,
    Button
} from '@mui/material';

import { CheckCircleOutline, ContentCopy } from '@mui/icons-material';

import { css } from '@emotion/css';

import car1 from '../assets/car-404px.png';

export const Modal = ()=>{
    const { 
        visible,
        hide,
        screenshotURL,
        resetScreenshotURL,
        liga, 
        resetLiga
    } = useModal();

    const onClose=()=>{
        hide();
        resetScreenshotURL();
        resetLiga();
    };

    const onClickCopy = ()=>{
        navigator.clipboard.writeText(liga ?? 'liga vacia');
    };

    return (
        <Dialog         
            PaperProps={{
                style:{
                    backgroundImage: `linear-gradient( #FFFFFF00, #FFFFFF77)`,
                    backgroundColor: `#0E8A86`,
                    boxShadow: 'none'
                }
            }}
            open={visible}
            onClose={onClose}
            maxWidth='lg'
            bgcolor='black'
            fullWidth={screenshotURL}
        >
            {
                screenshotURL ? 
                <>
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
                </>
                
                :
                <DialogContent 
                    sx={{
                        display: 'flex',
                        flexFlow: 'column nowrap',
                        alignItems: 'center',
                        gap: '1rem', 
                    }}
                >
                    <CheckCircleOutline htmlColor='#82FFD1' sx={{fontSize: '8rem', margin: '1rem auto'}}/>
                    <Typography color='white' variant='h4' maxWidth='sm'>Petición exitosa!</Typography>
                    <Typography color='white' variant='h5' maxWidth='sm'>Parece ser que tu anuncio sigue creadose, esto puede tomar varios minutos pero podras visitarlo en la liga de abajo cuando este listo</Typography>
                    <Box 
                        sx={{backgroundColor: 'rgba(0,0,0,0.3)'}}
                        width=          '100%'
                        padding=        '0.5rem 1rem'
                        display=        'flex'
                        flexWrap=       'nowrap'
                        justifyContent= 'center'
                        alignItems=     'center'
                        boxSizing=      'border-box'
                    >
                        <Link 
                            display='block'
                            padding='0.5rem 1rem'
                            variant='button'
                            href=   {liga}
                            target= '_blank'
                            color=  '#FFFFFF'
                        > 
                            {liga ?? 'Aqui va la liga'} 
                        </Link>
                        <Button 
                            sx={{
                                color:      'white',
                                borderLeft: '1px solid',
                                borderRadius: 0
                            }} 
                            type='button' 
                            onClick={onClickCopy}
                        > 
                            <ContentCopy color='white'/> 
                        </Button>
                    </Box>
                </DialogContent>
            }            
        </Dialog>
    );
};

export default Modal;
