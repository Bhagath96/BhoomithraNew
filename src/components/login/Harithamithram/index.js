import React from 'react';
import { Form } from 'redux-form';
import { IconButton, Link, FormGroup, TextField, Typography, Grid, Box, InputAdornment, makeStyles, useMediaQuery } from '@material-ui/core';

import Button from '../../../common/components/custom/PrimaryButton';
import { Icons, I18n } from '../../../common/components';
import { LOGIN_IMAGE } from './constants';
const { Visibility, VisibilityOff } = Icons;
import './fonts.css';
const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        height: '100%',
        background: 'linear-gradient(320deg, #132B00 0%,#58A33E 100%)',
        paddingTop: '100px',
        position: 'relative',
        fontFamily: 'Fira Sans !important'
    },
    logoContainer: {
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        float: 'left'
    },
    projectName: {
        color: 'white',
        fontSize: '2.5rem',
        fontWeight: '900',
        marginTop: 0,
        fontFamily: 'Fira Sans'
    },
    form: {
        background: '#FFFFFF',
        opacity: '0.95',
        boxShadow: '10px 15px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '40px',
        padding: '40px',
        height: '500px',
        [`${theme.breakpoints.down('lg')}`]: {
            height: '400px'
        }
    },
    loginTxt: {
        fontSize: '2.5rem',
        fontWeight: '900',
        fontFamily: 'Fira Sans !important',
        [`${theme.breakpoints.down('lg')}`]: {
            fontSize: '2rem'
        }
    },
    loginLabel: {
        fontSize: '1.3em',
        fontWeight: '500',
        fontFamily: 'Fira Sans !important',
        [`${theme.breakpoints.down('lg')}`]: {
            fontSize: '1em'
        }
    },
    input: {
        backgroundColor: '#dee8f2',
        width: '100%'
    },
    forgotLink: {
        color: '#039123F2',
        cursor: 'pointer',
        fontSize: '1.1em',
        fontFamily: 'Fira Sans !important',
        [`${theme.breakpoints.down('lg')}`]: {
            fontSize: '0.8em'
        }
    },
    loginButton: {
        width: '100%',
        padding: '15px 0',
        borderRadius: '10px',
        color: 'black !important',
        fontWeight: '900',
        fontFamily: 'Fira Sans !important',
        [`${theme.breakpoints.down('lg')}`]: {
            padding: '10px 0'
        }
    },
    loginImage: {
        position: 'absolute',
        left: '-13.11%',
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: '50%',
        opacity: '0.5'
    },
    slogan: {
        fontSize: '1.5rem',
        textAlign: 'justify',
        fontWeight: '500',
        letterSpacing: '0.08666rem',
        marginTop: 25,
        borderRadius: '5px',
        fontFamily: 'Fira Sans !important',
        [`${theme.breakpoints.down('lg')}`]: {
            marginTop: 10
        }
    }
}));
const Harithamithram = (props) => {
    const classes = useStyles();
    const { change, handleSubmit, submit, changeRoute, changePasswordType, passwordType, PROJECT_DETAILS, LoginLogo } = props;

    const matches1024 = useMediaQuery('(max-width:1024px)');
    const matches1824 = useMediaQuery('(max-width:1824px)');

    return (
        <Grid container className={classes.root}>
            {!matches1024 && <Grid item xs={12} lg={12} className={classes.loginImage}>
                <img style={{ width: '100%', height: '100%' }} src={LOGIN_IMAGE} alt="" />
            </Grid>}
            <Grid container justify="center" direction="row" alignItems='stretch' style={{ height: '100%' }}>
                <Grid item xs={12} md={5} lg={5} className={classes.logoContainer}>
                    <Grid item xs='12' style={matches1024 ? { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' } : {}}>
                        <h1 className={classes.projectName}>
                            {I18n.t(PROJECT_DETAILS.NAME)}
                        </h1>
                        <LoginLogo
                            alt={I18n.t(PROJECT_DETAILS.NAME)}
                            src={PROJECT_DETAILS.LOGO_LOGIN}
                            height={matches1824 ? '12' : '20'}
                            width={matches1824 ? '12' : '20'}
                        />
                        <Typography className={classes.slogan}
                            style={matches1024 ? { textAlign: 'center' } : matches1824 ? { fontSize: '1rem' } : {}}
                            variant="h6">{I18n.t(PROJECT_DETAILS.SLOGAN)}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={5} lg={5} sm={10} style={{ display: 'flex', justifyContent: 'flex-end' }} >
                    <Grid item xs={12} lg={10} md={12} sm={12} xl={8} >
                        <Form onSubmit={handleSubmit(submit)} autoSave={1} className={classes.form}>
                            <Grid container style={{ height: '100%' }} spacing={2} justifyContent='space-between'>
                                <Grid item xs='12' style={{ textAlign: 'center' }}>
                                    <Typography className={classes.loginTxt} >{I18n.t('login')}</Typography>
                                </Grid>
                                <Grid item xs={12} lg={12} sm={12} md={12} xl={12}>
                                    <Grid>
                                        < FormGroup >
                                            <Grid container direction='column' spacing={1} alignItems="flex-start">
                                                <Typography className={classes.loginLabel}>{I18n.t('u_name')}</Typography>
                                                <Grid item xs={12} style={{ width: '100%' }}>
                                                    <TextField
                                                        type='text'
                                                        className={classes.input}
                                                        variant='outlined'
                                                        onChange={(e) => {
                                                            change('username', e.target.value);
                                                        }}
                                                        name="username"
                                                        id="username"
                                                        style={{}}
                                                        fullWidth={true}
                                                        autoSave={1}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </FormGroup >
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} lg={12} sm={12} md={12} xl={12}>
                                    <Grid>
                                        < FormGroup >
                                            <Grid container direction='column' spacing={1} alignItems="flex-start">
                                                <Typography className={classes.loginLabel}>{I18n.t('password')}</Typography>
                                                <Grid item xs={12} style={{ width: '100%' }} >
                                                    <TextField
                                                        className={classes.input}
                                                        type={passwordType} onChange={(e) => {
                                                            change('password', e.target.value);
                                                        }}
                                                        variant='outlined'
                                                        name="password" id="password"
                                                        fullWidth={true}
                                                        autoSave={1}
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={changePasswordType}
                                                                        style={{ backgroundColor: 'transparent' }}
                                                                        edge="end"
                                                                    >
                                                                        {passwordType === 'password' ? <Visibility /> : <VisibilityOff />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            )
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </FormGroup>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box
                                        display="flex"

                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Box>
                                        </Box>
                                        <Box>
                                            <Box>
                                                <Link className={classes.forgotLink} onClick={changeRoute} variant="body2" >{I18n.t('forgot_your_password')}</Link>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button className={classes.loginButton} type="submit">{I18n.t('login')}</Button>
                                </Grid>
                            </Grid>
                        </Form>
                    </Grid>


                </Grid>

            </Grid >
        </Grid >
    );
};

export default Harithamithram;
