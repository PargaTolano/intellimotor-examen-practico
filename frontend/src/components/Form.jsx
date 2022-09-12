import React, { useMemo } from 'react';
import {
    Container,
    TextField,
    Button,
    Grid,
    Typography
} from '@mui/material';

import { css } from '@emotion/css';

import { useForm } from 'react-hook-form';

import useModal from '../hooks/modal';
import useLoading from '../hooks/loading';

import { yupResolver }from '@hookform/resolvers/yup';
import * as yup from 'yup';

import AnuncioService from '../service/anuncioService';

const schema = yup.object({
    precio:         yup.number()
                        .typeError('tiene que ser un numero')
                        .positive('tiene que ser positivo')
                        .integer('tiene que ser un entero')
                        .required('campo requerido'),
    descripcion:    yup.string().required('campo requerido'),
}).required();

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
    const { show, setScreenshotURL, setLiga } = useModal();
    const { 
        handleSubmit, 
        register, 
        formState:{errors} 
    } = useForm({resolver: yupResolver(schema)});



    const onsubmit = async data => {
        try {
            const { precio, descripcion } = data;
            setVisible(true);
            const { pendiente, ruta, liga} = await AnuncioService.crearAnuncio(precio, descripcion);
            if(!pendiente)
                setScreenshotURL(`${process.env.REACT_APP_SCREENSHOTS_URL}/${ruta}`);
            else
                setLiga(liga);
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
        <Container sx={{flex: '1 0 0'}} maxWidth={false}>
            <Grid 
                container 
                maxWidth=       'md'
                justifyContent= 'center'
                alignItems=     'center'
                margin=         '0 auto'
                height=         '100%'
            >
                <form
                    className={classes.form}
                    onSubmit={handleSubmit(onsubmit)}
                >
                    <Typography 
                        padding=        {2} 
                        textAlign=      'left' 
                        variant=        'h4' 
                        color=          'white' 
                        textTransform=  'capitalize'
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
                                    error={errors.precio}
                                    helperText={errors.precio?.message}
                                    {...register('precio', {required: true, minLength: 1})}
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
                                    error={errors.descripcion}
                                    helperText={errors.descripcion?.message}
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
