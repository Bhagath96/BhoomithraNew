import React from 'react';
import { Components, I18n } from '../../../common/components';
import { makeStyles, Paper, withStyles } from '@material-ui/core';
import { renderSelect } from '../../../utils/FormUtils';
import { Field, Form, reduxForm } from 'redux-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { Button } from '@material-ui/core';
import { CounterCard } from './DashboardComponents';
import { LsgiArray, LsgitTypeArray, districtArray, wardArray } from '../ApiConstants';
import { connect } from 'react-redux';


const { Grid } = Components;

const useStyles = makeStyles((theme) => ({
    pickyContainer: {
        marginBottom: '10px'
    },
    datePicker: {
        backgroundColor: 'white',
        color: 'black !important'
    },
    item: {
        padding: theme.spacing(1)
    }
}));

const DatePickerButton = withStyles(() => ({
    root: {
        backgroundColor: 'white',
        border: '1px solid grey !important',
        '&:hover': {
            backgroundColor: 'white'
        }
    },
    label: {
        color: 'black',
        '&:hover': {
            color: 'black'
        }
    },
    startIcon: {
        color: 'black'
    }
}))(Button);

const WasteDetails = () => {
    const classes = useStyles();

    const CustomDatePicker = () => (
        <DatePickerButton startIcon={<DateRangeIcon style={{ color: 'black' }} />} disableElevation variant="contained">
            <div>10-01-2020</div>
        </DatePickerButton>
    );

    return (
        <>
            <Paper elevation={3} style={{ marginBottom: 15 }}>
                <Form>
                    <Grid container className={classes.item}>
                        <Grid item lg={4} xs={6} sm={6} md={6} className={classes.item}>
                            <Field name="District" label='District' component={renderSelect}>
                                {districtArray}
                            </Field>
                        </Grid>
                        <Grid item lg={4} xs={6} sm={6} md={6} className={classes.item}>
                            <Field name="LsgitType" label='LsgitType' component={renderSelect}>
                                {LsgitTypeArray}
                            </Field>
                        </Grid>
                        <Grid item lg={4} xs={6} sm={6} md={6} className={classes.item}>
                            <Field name="Lsgi" label='Lsgi' component={renderSelect}>
                                {LsgiArray}
                            </Field>
                        </Grid>

                        <Grid item lg={4} xs={6} sm={6} md={6} className={classes.item}>
                            <Field name="Ward" label='Ward' component={renderSelect}>
                                {wardArray}
                            </Field>
                        </Grid>
                        <Grid item lg={4} xs={6} sm={6} md={6} className={classes.item} >
                            <DatePicker
                                //selectsRange

                                //selected='10-11-2021'
                                //startDate='10-11-2021'
                                //endDate='10-12-2021'
                                // onChange={(update) => {
                                //   setCommonFilter({ startDate: update[0], endDate: update[1] });
                                //   if (update[1]) {
                                //     loadDashBoard();
                                //   }
                                // }}
                                //dateFormat={DATE_FORMAT}
                                customInput={<CustomDatePicker />}
                            />
                        </Grid>
                    </Grid>
                </Form>
            </Paper>

            <Grid container spacing={2} style={{ marginBottom: '8px' }}>
                <Grid item lg={4} sm={4} xs={4} >
                    <CounterCard title={I18n.t('Total_Stock_LDPE')} subtitle={I18n.t('Plain_White')} icon='mdi-account-multiple'
                        content={{ count: 340 }} />
                </Grid>
                <Grid item lg={4} sm={4} xs={4} >
                    <CounterCard color='color-info' title={I18n.t('Total_Stock_LDPE')} subtitle={I18n.t('Print_Colour')} icon='mdi-tools'
                        content={{ count: 870 }} />
                </Grid>
                <Grid item lg={4} sm={4} xs={4} >
                    <CounterCard color='color-brown' title={I18n.t('Total_Stock_HDPE')} subtitle={I18n.t('Plain_White')} icon='mdi-currency-inr'
                        content={{ count: 300 }} />
                </Grid>
                <Grid item lg={4} sm={4} xs={4} >
                    <CounterCard color='color-red' title={I18n.t('Total_Stock_HDPE')} subtitle={I18n.t('Print_Colour')} icon='mdi-currency-inr'
                        content={{ count: 700 }} />
                </Grid>
                <Grid item lg={4} sm={4} xs={4} >
                    <CounterCard color='color-blueGrey' title={I18n.t('Total_Stock_Polypropylene_PP')} subtitle={I18n.t('White')} icon='mdi-currency-inr'
                        content={{ count: 2000 }} />
                </Grid>
                <Grid item lg={4} sm={4} xs={4} >
                    <CounterCard title={I18n.t('Total_Stock_Polypropylene_PP')} subtitle={I18n.t('Colour')} icon='mdi-currency-inr'
                        content={{ count: 100 }} color='color-lime' />
                </Grid>
                <Grid item lg={4} sm={4} xs={4} >
                    <CounterCard title={I18n.t('Total_Shredded_Plastic')} subtitle='' icon='mdi-currency-inr'
                        content={{ count: 100 }} color='color-amber' />
                </Grid>
            </Grid>
        </>
    );
};

export default connect()(reduxForm({
    form: 'WasteDashBoard'
})(WasteDetails));
