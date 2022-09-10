import React, {useMemo} from 'react';
import {
    Container,
    TextField,
    Button,
    Grid,
    Typography
} from '@mui/material';

import { css } from '@emotion/css';

import { 
    useForm, 
    Controller,
} from 'react-hook-form';

import useModal from '../hooks/modal';
import useLoading from '../hooks/loading';
import AnuncioService from '../service/anuncioService';
import { useEffect } from 'react';

const getStyles = ()=>({
    form:  css`
        width: 100%;
        overflow:                   hidden;
    `,
    input: css`color: white!important`,
    field: css`width: 100%; color: white!important;`,
    label: css`
        color: white!important;
        &[data-shrink='true']{
            color: #1976D2!important
    }`,
});

export const Form = () => {
    
    const { setVisible } = useLoading(); 
    const { show, setScreenshotURL } = useModal();
    const { handleSubmit, register, formState:{errors} } = useForm();

    useEffect(()=>console.log(errors), []);

    const onsubmit = async data => {
        try {
            const { precio, descripcion } = data;
            setVisible(true);
            const url = await AnuncioService.crearAnuncio(precio, descripcion);
            setScreenshotURL(url);
            show();
        } catch (e) {
            alert(e.message);
        }
        finally{
            setVisible(false);
        }
    };

    // process classes only once
    const classes = useMemo(getStyles, []);

    return (
        <Container maxWidth={false}>
            <Grid 
                container 
                maxWidth='md' 
                justifyContent='center' 
                alignItems='center' 
                margin='0 auto' 
                height='100vh'
            >
                <form
                    className={classes.form}
                    onSubmit={handleSubmit(onsubmit)}
                >
                    <Typography 
                        padding={2} 
                        textAlign='left' 
                        variant='h4' 
                        color='white' 
                        textTransform='capitalize'
                    >
                        anuncia tu auto
                    </Typography>
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid 
                                container 
                                item 
                                xs={12} 
                                padding={2}
                            >
                                <TextField
                                    {...register('precio', {required: true, minLength: 1, maxLength: 4})}
                                    type='number'
                                    className={classes.field}
                                    InputProps={{className: classes.input}}
                                    InputLabelProps={{className: classes.label}}
                                    label='Precio'
                                    variant='filled'
                                    autoComplete='off'
                                />
                            </Grid>
                            <Grid 
                                container 
                                item 
                                xs={12} 
                                padding={2}
                            >
                                <TextField
                                    {...register('descripcion',{required: true, minLength: 1})}
                                    className={classes.field}
                                    InputProps={{className: classes.input}}
                                    InputLabelProps={{className: classes.label}}
                                    label='Descripcion'
                                    multiline
                                    rows={4}
                                    variant='filled'
                                    autoComplete='off'
                                />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} padding={2}>
                            <Button fullWidth type='submit' variant='contained'>Publicar</Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Container>
    );
};

export default Form;
