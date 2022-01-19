import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { makeStyles } from '../common/components';
import { Link } from 'react-router-dom';
import i18n from '../i18n';
import { themeColors } from '../common/theme';

const { themeSecondaryColor, themePrimaryColor } = themeColors;

const useStyles = makeStyles(() => ({
    root: {
        position: 'relative',
        paddingTop: '100px',
        paddingBottom: '100px',
        backgroundColor: themeSecondaryColor,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100%'
    },
    pageTitleContent: {
        position: 'relative',
        marginTop: '- 6px',
        textAlign: 'center'
    },
    headerTitle: {
        marginBottom: '15px',
        fontSize: '48px',
        color: ' #fff'
    },
    headerTitleUl: {
        display: 'inline-flex',
        paddingLeft: '0',
        listStyleType: 'none',
        marginTop: '10px',
        marginBottom: '-5px'
    },
    headerTitleLi: {
        display: 'inline-block',
        position: 'relative',
        fontSize: '16px',
        paddingRight: '15px',
        marginLeft: '15px'
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
    }


}));
function PrivacyAndPolicy() {
    let date = new Date();
    let year = date.getFullYear();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const classes = useStyles();
    return (
        <div style={{ backgroundColor: themePrimaryColor }}>
            <div className={classes.root}>
                <div className='container'>
                    <div className={classes.pageTitleContent}>
                        <h1 className={classes.headerTitle}>{i18n.t('privacy_policy')}</h1>
                        <ul className={classes.headerTitleUl}>
                            <li>
                                <Link style={{ color: '#fff' }} to='/'>{i18n.t('home')}</Link>
                            </li>
                            <li style={{ display: 'inline-block', position: 'relative', fontSize: '16px', paddingRight: '15px', marginLeft: '15px' }}>
                                <Link style={{ color: '#f68820' }} to='/terms-condition'>{i18n.t('terms_condition')}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <Grid item xs={12} sm={12} md={12} lg={12} style={{ backgroundColor: themePrimaryColor }}>

                <div style={{ marginLeft: '100px', marginRight: '100px', backgroundColor: themePrimaryColor }}>
                    <div>
                        <h3>Website terms of use</h3>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren</p>
                        <ul>
                            <li>Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Donec sollicitudin molestie
                            malesuada.</li>
                            <li>Vivamus suscipit tortor eget felis porttitor volutpat. Nulla quis lorem ut libero malesuada
                            feugiat.</li>
                            <li>Proin eget tortor risus. Pellentesque in ipsum id orci porta dapibus.</li>
                            <li>Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt.</li>
                        </ul>
                    </div>
                    <div >
                        <h3>General</h3>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</p>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet consetetur sadipscing elitr, sed diam.</p>
                        <ul>
                            <li>Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Donec sollicitudin molestie
                            malesuada.</li>
                            <li>Vivamus suscipit tortor eget felis porttitor volutpat. Nulla quis lorem ut libero malesuada
                            feugiat.</li>
                            <li>Proin eget tortor risus. Pellentesque in ipsum id orci porta dapibus.</li>
                            <li>Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt.</li>
                        </ul>
                    </div>
                    <div >
                        <h3>Information about us and the website</h3>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet.</p>
                    </div>
                    <div className="terms-content">
                        <h3>Services and transactions</h3>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren</p>
                        <ul>
                            <li>Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Donec sollicitudin molestie
                            malesuada.</li>
                            <li>Vivamus suscipit tortor eget felis porttitor volutpat. Nulla quis lorem ut libero malesuada
                            feugiat.</li>
                            <li>Proin eget tortor risus. Pellentesque in ipsum id orci porta dapibus.</li>
                            <li>Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt.</li>
                        </ul>
                    </div>
                    <div className="terms-content">
                        <h3>Objective and scope of policy</h3>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</p>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet consetetur sadipscing elitr, sed diam.</p>
                        <ul>
                            <li>Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Donec sollicitudin molestie
                            malesuada.</li>
                            <li>Vivamus suscipit tortor eget felis porttitor volutpat. Nulla quis lorem ut libero malesuada
                            feugiat.</li>
                            <li>Proin eget tortor risus. Pellentesque in ipsum id orci porta dapibus.</li>
                            <li>Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt.</li>
                        </ul>
                    </div>
                    <div className="terms-content">
                        <h3>Registration</h3>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
                        justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                        ipsum dolor sit amet dolore.</p>
                    </div>
                    <div className="terms-content">
                        <h3>Your password​</h3>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet.</p>
                    </div>
                    <div className="terms-content content-8">
                        <h3>Our liability to you</h3>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
                        justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                        ipsum dolor sit amet dolore.</p>
                    </div>
                </div>

            </Grid>
            <div className={classes.copyRight}>
                <p className={classes.copyRightTxt}>© {year}</p>
            </div >

        </div >
    );
}

export default PrivacyAndPolicy;
