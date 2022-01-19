import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import i18n from '../../../i18n';
import { Link } from 'react-router-dom';
import { themeColors } from '../../theme';
import { getProjectProps } from '../../../utils/ConfigUtils';
import { PROJECT_CONFIG_PROPS } from '../../../common/constants';

const { themeSecondaryColor } = themeColors;

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'whitesmoke',
        minHeight: '600px'
    },
    footerContainer: {
        flex: 1,
        display: 'flex',
        flexWrap: 'wrap',
        padding: '20px',
        backgroundColor: themeSecondaryColor,
        minHeight: '450px',
        clipPath: 'polygon(0% 0%,19% 5%,100% 26%,100% 100%,0% 100%)'
    },
    logoContainer: {
        padding: '15px',
        marginTop: '100px'

    },
    logo: {
        objectFit: 'contain',
        width: '137px',
        height: '127px',

        margin: '0 auto',
        marginBottom: '20px'
    },
    para: {
        color: '#fff',
        fontSize: '14px',
        lineHeight: '16px',
        letterSpacing: '2px'
    },
    serviceContainer: {
        padding: '15px',
        paddingTop: '117px'

    },
    copyRight: {
        backgroundColor: '#252525',
        textAlign: 'center',
        height: '80px',
        fontSize: 'var(--text-sub)',
        padding: '',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    copyRightTxt: {
    },
    ul: {
        paddingLeft: '0'
    },
    li: {
        marginBottom: '25px',
        listStyle: 'none'
    },
    a: {
        color: '#fff',
        textTransform: 'uppercase',
        letterSpacing: '1.11px',
        fontWeight: '500',
        fontSize: '14px',
        textDecoration: 'none',
        backgroundColor: 'transparent'
    },
    gridContainer: {
        marginTop: '50px'
    },
    container: {
        height: '100Px'
    },
    h3: {
        color: '#fff',
        wordWrap: 'break-word',
        textTransform: 'uppercase',
        margin: '24px 0',
        fontWeight: '700',
        fontSize: '32px'
    }

});
export default function FooterMain() {
    const PROJECT_DETAILS = getProjectProps(PROJECT_CONFIG_PROPS.DETAILS);
    let date = new Date();
    let year = date.getFullYear();
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.footerContainer}>
                <Grid item xs={12} sm={12} md={8} className={classes.logoContainer}>
                    <img className={classes.logo} src={PROJECT_DETAILS.LOGO_MENU} alt='logo' />
                    <h3 className={classes.h3}>{i18n.t('my_beautiful_city')} </h3>
                    <p className={classes.para}>
                        {i18n.t('my_beautiful_city')}
                    </p>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Grid container className={classes.gridContainer}>
                        <Grid item xs={3} md={4} sm={4} className={classes.logoContainer} >
                            <ul className={classes.ul}>
                                <li className={classes.li}>
                                    <a className={classes.a}>{i18n.t('home')}</a>
                                </li>
                                <li className={classes.li}>
                                    <a className={classes.a} >{i18n.t('about')}</a>
                                </li>
                                <li className={classes.li}>
                                    <a className={classes.a}>{i18n.t('activity')}</a>
                                </li>
                            </ul>
                        </Grid>
                        <Grid item xs={3} md={4} sm={4} className={classes.logoContainer}>
                            <ul className={classes.ul}>
                                <li className={classes.li}>
                                    <a className={classes.a} >{i18n.t('news')}</a>
                                </li>
                                <li className={classes.li}>
                                    <a className={classes.a} >{i18n.t('contact_as')}</a>
                                </li>
                                <li className={classes.li}>
                                    <a className={classes.a} >{i18n.t('faq')}</a>
                                </li>
                            </ul>
                        </Grid>
                        <Grid item xs={6} md={4} sm={4} className={classes.logoContainer} >
                            <ul className={classes.ul}>
                                <li className={classes.li}>
                                    <Link className={classes.a} to='/privacy'>{i18n.t('privacy_policy')}</Link>
                                </li>
                                <li className={classes.li}>
                                    <Link className={classes.a} to='/terms-condition'>{i18n.t('terms_condition')}</Link>
                                </li>
                            </ul>
                        </Grid>
                    </Grid>

                </Grid>
            </div >
            <div className={classes.copyRight}>
                <p className={classes.copyRightTxt}>© {year}</p>
            </div >

        </div >
    );
}
