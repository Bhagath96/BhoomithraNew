import React, { useState, useEffect } from 'react';
import { TextField, withStyles } from '@material-ui/core';
import { Components, I18n } from '../../../common/components';
import AddLocationRoundedIcon from '@material-ui/icons/AddLocationRounded';
import _ from 'lodash';
import Swal from 'sweetalert2';
const { Grid, Button, Colors } = Components;

const customStyles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: '15px',
        alignItems: 'center'
    },
    locationFrame: {
        textAlign: 'center',
        padding: '10px'
    },
    textField: {
        marginBottom: '15px',
        color: 'black !important'
    },
    iframe: {
        border: 'none',
        width: '100%',
        height: '100%'
    }

};
const CustomButton = withStyles({
    root: {
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: Colors['color-basic-800'],
        minWidth: '200px',
        padding: '10px',
        borderRadius: '50px',
        justifyContent: 'space-evenly',
        '&:hover': {
            backgroundColor: Colors['color-basic-900']
        }
    },
    label: {
        '&:hover': {
            color: 'white'
        }
    }
})(Button);

const WhiteTextField = withStyles({
    root: {
        '& .MuiInputBase-input': {
            color: 'black' // Text color
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'black' // Semi-transparent underline
        },
        '& .MuiInput-underline:hover:before': {
            borderBottomColor: 'black' // Solid underline on hover
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'black' // Solid underline on focus
        },
        '& .MuiFormLabel-root': {
            color: '#a2a2a2'
        },
        '& .MuiFormLabel-root:after': {
            color: '#a2a2a2'
        }
    }
})(TextField);
const LocationMapping = (props) => {
    const { initialValues = {} } = props;
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [formattedAddress, setFormattedAddress] = useState('');

    useEffect(() => {
        setLatitude(initialValues.latitude);
        setLongitude(initialValues.longitude);
        setFormattedAddress(initialValues.formattedAddress);
    }, [initialValues]);

    return (
        <Grid container style={customStyles.root}>
            <Grid container direction='row'>
                <Grid item xs={6} style={customStyles.locationFrame} >
                    <iframe style={customStyles.iframe} src={`https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&output=embed`} />
                </Grid>
                <Grid item xs={6}>
                    <Grid container justify="flex-start" direction='column'>
                        <WhiteTextField style={customStyles.textField} label={(I18n.t('latitude'))} value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                        <WhiteTextField style={customStyles.textField} label={(I18n.t('longitude'))} value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                        <WhiteTextField style={customStyles.textField} label={(I18n.t('formatted_address'))} value={formattedAddress} onChange={(e) => setFormattedAddress(e.target.value)} />
                    </Grid>

                </Grid>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
                <CustomButton onClick={() => {
                    if (_.isNumber(latitude) && _.isNumber(longitude)) {
                        props.onGetLocation && props.onGetLocation({ latitude: _.toNumber(latitude || 0), longitude: _.toNumber(longitude || 0), formattedAddress });
                    } else {
                        Swal.fire({
                            title: I18n.t('invalid_location'),
                            type: 'error',
                            width: 600
                        });
                    }
                }}>{I18n.t('set_location')}<AddLocationRoundedIcon /></CustomButton>
            </Grid>
        </Grid>);
};

export default LocationMapping;
