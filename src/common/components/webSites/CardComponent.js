import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { Icons } from '../../components';
import CustomerPortal from '../../../assets/image/CustomerPortal.png';
import { getProjectProps } from '../../../utils/ConfigUtils';
import { PROJECT_CONFIG_PROPS } from '../../../common/constants';
import { PORTALS } from '../../../configs/project';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#fff',
        width: '350px',
        borderRadius: '12px'
    },
    media: {
        height: '80%',
        width: '90%',
        objectFit: 'scale-down'
    },
    typeName: {
        color: ' #000',
        fontFamily: 'raleway,sans-serif',
        fontWeight: '500',
        marginBottom: '15px',
        fontSize: '22px',
        textDecoration: 'none !important'
    },
    icon: {
        width: '100px',
        height: '150px',
        objectFit: 'contain'
    },
    box: {
        background: ' #fff',
        borderRadius: '20px',
        margin: '20px',
        display: 'block',
        width: '350px',
        textDecoration: 'none!important'
    }
});

const CardComponent = ({ name, description }) => {
    const portal = getProjectProps(PROJECT_CONFIG_PROPS.PORTAL);
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item xs={1} sm={1} md={4}></Grid>

            <Grid item xs={10} sm={10} md={4} style={{ marginTop: '350px' }}>
                <a className={classes.box} href={portal[PORTALS.ADMIN].url}>
                    <Grid item xs={12} sm={12} md={12} style={{ display: 'flex', justifyContent: 'center' }} >
                        <img className={classes.icon} src={CustomerPortal} alt='customer' id='customer' />
                        {/* <Icons.PersonOutline className={classes.icon} /> */}
                    </Grid>
                    <Card className={classes.root}>
                        <CardContent style={{ textAlign: 'center', fontSize: '20px' }}>

                            <Typography component="h1" variant="subtitle1" color="initial" className={classes.typeName}>{name}</Typography>
                            <p style={{ minHeight: '100px', color: '#4a4a4a', textAlign: 'justify', textDecoration: 'none!important', fontSize: '16px' }}>{description}</p>
                        </CardContent>
                    </Card>
                </a>
            </Grid>
            <Grid item xs={1} sm={1} md={4}></Grid>

        </Grid >
    );
};

export default CardComponent;
