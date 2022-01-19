import React, { useEffect } from 'react';
import { Grid, makeStyles, ButtonGroup, Button } from '@material-ui/core';
import logo from '../../../assets/image/Harithamithram/Logo.png';
import I18n from '../../../i18n';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        background: '#509224',
        position: 'fixed',
        top: '0',
        width: '100%',
        zIndex: '99',
        maxHeight: '90px'

    },
    imageSticky: {
        width: '70px',
        height: '80px',
        objectFit: 'contain',
        marginLeft: '30px',
        marginBottom: '20px',
        marginTop: '-15px'
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
export default function Header() {
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

    let setDefaultLanguage = {};
    let Language = 'en-IN';
    setDefaultLanguage.id = 1;
    setDefaultLanguage.locale = Language;
    setDefaultLanguage.state = true;
    let selectedLanguage = JSON.parse(localStorage.getItem('selectedLanguage')) || setDefaultLanguage;
    const [selectedBtn, setSelectedBtn] = React.useState(selectedLanguage?.id);


    useEffect(() => {
        if (selectedBtn === 2) {
            Language = 'ml-IN';
            setDefaultLanguage.id = 2;
            setDefaultLanguage.locale = Language;
            setDefaultLanguage.state = false;
        } else {
            Language = 'en-IN';
            setDefaultLanguage.id = 1;
            setDefaultLanguage.locale = Language;
            setDefaultLanguage.state = true;
        }
        localStorage.setItem('selectedLanguage', JSON.stringify(setDefaultLanguage));
        I18n.changeLanguage(Language);
    }, [selectedBtn]);

    return (

        <div container className={classes.root} id='myHeader'>
            <Grid item xs={6} sm={8} md={10} className={classes.alignment} >
                <img className={classes.imageSticky} src={logo} alt='logo' id='logo' />
            </Grid>
            <Grid item xs={6} sm={4} md={2} className={classes.alignment}>

                <ButtonGroup variant="text" color='primary'>
                    <Button style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }} color={selectedBtn === 1 ? 'secondary' : 'primary'} variant="text" onClick={() => setSelectedBtn(1)}>English</Button>
                    <Button style={{ borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }} color={selectedBtn === 2 ? 'secondary' : 'primary'} variant="text" onClick={() => setSelectedBtn(2)}>Malayalam</Button>
                </ButtonGroup>

            </Grid>

        </div>

    );
}
