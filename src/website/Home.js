import React, { useEffect, useState } from 'react';
import '.././assets/css/common.css';
import CardComponent from '../common/components/webSites/CardComponent.js';
import FooterMain from '../common/components/webSites/Footer.js';
// import Header from '../common/components/webSites/Header.js';
import I18n from '../i18n';
import { Grid, makeStyles, ButtonGroup, Button } from '@material-ui/core';
import { themeColors } from '../common/theme';
import { getProjectProps } from '../utils/ConfigUtils';
import { PROJECT_CONFIG_PROPS } from '../common/constants';
import { DEFAULT_LANGUAGE } from '../modules/common/constants';
import { withStyles } from '@material-ui/core/styles';


const { themePrimaryColor } = themeColors;
const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        background: themePrimaryColor,
        position: 'fixed',
        top: '0',
        width: '100%',
        zIndex: '99',
        maxHeight: '90px'

    },
    imageSticky: {
        width: '100px!important',
        height: '80px!important',
        objectFit: 'contain!important',
        marginLeft: '30px!important',
        marginBottom: '20px!important',
        marginTop: '-15px!important'
    },
    alignment: {
        marginTop: '20px'
    },
    header: {
        padding: '10px 16px',
        background: '#555',
        color: ' #f1f1f1'
    },

    content: {
        padding: '16px'
    },

    sticky: {
        background: '#fff',
        position: 'fixed',
        top: '0',
        width: '100%',
        maxHeight: '90px'
    },
    // eslint-disable-next-line camelcase
    sticky____root: {
        paddingTop: '102px'
    }
});
const CustomButton = withStyles({

    contained: {
        boxShadow: 'none',
        '&:active': {
            boxShadow: 'none'
        },
        '&:focus': {
            boxShadow: 'none'
        }
    },
    containedSecondary: {
        backgroundColor: '#112b00',
        '&:hover': {
            backgroundColor: ' #473172'
        }
    },
    containedPrimary: {
        backgroundColor: '#94a973',
        '&:hover': {
            backgroundColor: '#473172'
        }
    },
    label: {
        color: 'none',
        '&:hover': {
            color: 'white'
        }
    }

})(Button);

function App() {
    const PROJECT_DETAILS = getProjectProps(PROJECT_CONFIG_PROPS.DETAILS);
    const { defaultLanguage: projectDefaultLanguage } = getProjectProps(PROJECT_CONFIG_PROPS.I18N);
    let description = I18n.t('portalDescription');
    let header = {};
    const classes = useStyles();

    function myFunction() {
        if (window.pageYOffset > 45) {
            header.classList.add(classes.sticky);
        } else {
            header.classList.remove(classes.sticky);
        }
    }
    useEffect(() => {
        window.onscroll = function () {
            myFunction();
        };
        header = window.document.getElementById('myHeader');
    }, [window.pageYOffset]);
    let selectedLanguage = JSON.parse(localStorage.getItem('selectedLanguage')) || DEFAULT_LANGUAGE;
    const [buttonStatus, setButtonStatus] = useState(selectedLanguage.id);

    const handleLanguageChange = (id) => {//need to change after api integration
        let setDefaultLanguage = DEFAULT_LANGUAGE;
        let locale = projectDefaultLanguage || setDefaultLanguage.locale;
        switch (id) {
            case 1:
                locale = 'en-IN';
                setDefaultLanguage.id = 1;
                setDefaultLanguage.locale = locale;
                break;
            case 2:
                locale = 'ml-IN';
                setDefaultLanguage.id = 2;
                setDefaultLanguage.locale = locale;
                break;
            default:
                locale = projectDefaultLanguage || setDefaultLanguage.locale;
                break;
        }
        localStorage.setItem('selectedLanguage', JSON.stringify(setDefaultLanguage));
        I18n.changeLanguage(locale);
        setButtonStatus(setDefaultLanguage?.id);
    };
    return (
        <Grid xs={12} md={12} lg={12} style={{ background: themePrimaryColor }}>
            <main style={{ position: 'relative', minHeight: '945px', marginTop: '-164px', background: themePrimaryColor }}>
                {/* <Header /> */}
                <div container className={classes.root} id='myHeader'>
                    <Grid item xs={6} sm={8} md={10} className={classes.alignment} >
                        <img className={classes.imageSticky} src={PROJECT_DETAILS.LOGO_MENU} alt='logo' id='logo' />
                    </Grid>
                    <Grid item xs={6} sm={4} md={2} className={classes.alignment}>

                        <ButtonGroup disableElevation variant="contained" color='primary' >
                            <CustomButton style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }} color={buttonStatus === 1 ? 'secondary' : 'primary'} onClick={() => handleLanguageChange(1)}>English</CustomButton>
                            <CustomButton style={{ borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }} color={buttonStatus === 2 ? 'secondary' : 'primary'} onClick={() => handleLanguageChange(2)}>Malayalam</CustomButton>
                        </ButtonGroup>

                    </Grid>
                </div>
                {/*  */}
                <CardComponent name={I18n.t('admin_portal')} description={description} />
            </main>
            <FooterMain />
        </Grid >
    );
}

export default App;
