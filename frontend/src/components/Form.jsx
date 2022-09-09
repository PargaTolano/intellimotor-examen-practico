import React, {useMemo} from 'react';
import {
    Container,
    TextField,
    Button,
    Grid,
    Typography
} from '@mui/material';

import { css, keyframes} from '@emotion/css';

import { 
    useForm, 
    Controller 
} from 'react-hook-form';

import useModal from '../hooks/modal';
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
    const { show } = useModal();
    const { handleSubmit, control } = useForm();
    const onsubmit = data =>{
        console.table(data);
        show();
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
                                <Controller
                                    name={'precio'}
                                    control={control}
                                    render={({field:{onChange, value}})=>(
                                        <TextField
                                            type='number'
                                            className={classes.field}
                                            InputProps={{className: classes.input}}
                                            InputLabelProps={{className: classes.label}}
                                            onChange={onChange}
                                            label='Precio'
                                            value={value}
                                            variant='filled'
                                            autoComplete='off'
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid 
                                container 
                                item 
                                xs={12} 
                                padding={2}
                            >
                                <Controller
                                    name={'descripcion'}
                                    control={control}
                                    render={({field:{onChange, value}})=>(
                                        <TextField 
                                            className={classes.field}
                                            InputProps={{className: classes.input}}
                                            InputLabelProps={{className: classes.label}}
                                            onChange={onChange} 
                                            label='Descripcion'
                                            value={value}
                                            multiline
                                            rows={4}
                                            variant='filled'
                                            autoComplete='off'
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} padding={2}>
                            <Button fullWidth type='submit' variant='contained'> Publicar Anuncio </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Container>
    );
};

export default Form;
