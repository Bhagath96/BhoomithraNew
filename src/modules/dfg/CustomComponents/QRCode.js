import React from 'react'
import ReactQRCode from 'react-qr-code';
import { TextField, Grid, Button } from '@material-ui/core';
import I18n from '../common/I18n';
import { Icon, withStyles } from '@material-ui/core';
import Colors from '../../../common/components/custom/Colors';

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

const QRCode = (props) => {
    const { initialValues = '' } = props;
    const [QRCode, setQRCode] = React.useState(initialValues);

    React.useEffect(() => {
        if (initialValues !== '') {
            setQRCode(initialValues);
        }
    }, [initialValues])

    return (
        <Grid container>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        {(QRCode !== '') && <ReactQRCode
                            value={QRCode}
                            fgColor={Colors['color-primary-900']}
                        />}
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: 'center' }} >
                        <TextField style={customStyles.textField} label={(I18n.t('qr_code'))} value={QRCode} onChange={(e) => setQRCode(e.target.value)} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
                <CustomButton onClick={() => {
                    props.onGetQRCode && props.onGetQRCode(QRCode);
                }}>{I18n.t('set_qr_code')} <Icon className='mdi mdi-qrcode-edit' /></CustomButton>
            </Grid>
        </Grid >
    )
}

export default QRCode
