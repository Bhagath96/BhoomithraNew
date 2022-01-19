import _ from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Components, I18n, makeStyles } from '../../../common/components';
import * as Actions from '../actions';
import { STATE_REDUCER_KEY, CRON_SIMPLE, CRON_EXPRESSIONS, WEEK_DAYS, RESIDENTIAL_CATEGORIES } from '../constants';
import { ReCron, Tab } from '@sbzen/re-cron';
import { Field, Form, reduxForm } from 'redux-form';
import { renderTextField, renderSelect } from '../../../utils/FormUtils';
import LoadingOverlay from '../../../common/components/custom/LoadingOverlay.js';
import cronstrue from 'cronstrue';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const { Button, CardComponent, Grid, Alert, Checkbox } = Components;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    item: {
        padding: theme.spacing(1)
    },
    submit: {
        textAlign: 'center'
    }
}));

const generateCronExpression = (current, data) => {
    const expArray = _.split(current, ' ');
    expArray.pop();
    expArray.push(data);
    return _.join(expArray, ' ');
};

const SearchCustomers = (props) => {
    const dispatch = useDispatch();
    const { handleSubmit } = props;
    const classes = useStyles();
    const { serviceIntervals = {},
        organizations = {}, serviceProviders = {}, wards = {}, serviceWorkers = {}, services = {}, residenceType = {}, tradingType = {}
    } = useSelector(state => state[STATE_REDUCER_KEY]);
    const { Schedule: { values: { simpleCron = {} } = {} } = {} } = useSelector(state => state.form);

    useEffect(() => {
        dispatch(Actions.fetchTradingType());
        dispatch(Actions.fetchOrganizationsList());
    }, []);

    const getDropDowns = (data = []) => data.map((value) => {
        return { id: value.id, name: I18n.t(value.name) };
    });

    const showWeekDays = () => {
        let response = false;
        if ((_.get(simpleCron, 'id', '') !== '')) {
            if (simpleCron.id === CRON_EXPRESSIONS.EVERY_WEEK || simpleCron.id === CRON_EXPRESSIONS.FORT_NIGHT) {
                response = true;
            }
        }
        return response;
    };

    const [currentOrganization, setCurrentOrganization] = React.useState({});
    const [currentWard, setCurrentWard] = React.useState({});
    const [currentServiceProvider, setCurrentServiceProvider] = React.useState({});
    const [currentServiceConfig, setCurrentServiceConfig] = React.useState({});
    const [weeklyCron, setWeeklyCron] = React.useState({});
    const [quartzCron, setQuartzCron] = React.useState('0 0 0 * * ?');
    const [showAdvanced, setShowAdvanced] = React.useState(false);

    const submit = (values) => {
        let initial = {
            serviceProviderId: '',
            wardId: '',
            serviceWorkerId: '',
            serviceConfigId: '',
            refId: '',
            cronExpression: '',
            residenceCategoryId: '',
            serviceIntervalId: ''
        };
        let objToSend = {
            ...initial,
            serviceProviderId: _.get(values, 'serviceProvider.id'),
            wardId: _.get(values, 'ward.id'),
            serviceWorkerId: _.get(values, 'gt.id'),
            serviceConfigId: _.get(values, 'service.id'),
            cronExpression: _.get(values, 'cronExpression', ''),
            residenceCategoryId: _.get(values, 'residence_type.id', _.get(values, 'residence_type.id', '')),
            serviceIntervalId: _.get(values, 'interval.id')
        };
        dispatch(Actions.fetchCustomers({ ...objToSend }));
    };

    return (
        <CardComponent>
            <div>
                <Form
                    onSubmit={handleSubmit(submit)}
                >
                    <LoadingOverlay
                        active={false}
                    >
                        <Grid container className={classes.item}>

                            <Grid item xs={6} sm={6} md={6} className={classes.item}>
                                <Field name="organization" label={I18n.t('organization')} component={renderSelect} onChange={(value) => {
                                    dispatch(Actions.fetchServiceProvidersList(value.id));
                                    setCurrentOrganization(value);
                                }
                                } >
                                    {
                                        _.get(organizations, 'data', [])
                                    }
                                </Field>
                            </Grid>

                            <Grid item xs={6} sm={6} md={6} className={classes.item}>
                                <Field name="serviceProvider" label={I18n.t('service_provider')} component={renderSelect} onChange={(value) => {
                                    //Currently no relations in DB For GT and Service, so fetching service details here
                                    dispatch(Actions.fetchServiceDetails({ serviceProviderId: value.id }));
                                    dispatch(Actions.fetchWards({ organizationId: currentOrganization.id, serviceProviderId: value.id }));
                                    setCurrentServiceProvider(value);
                                }
                                } >
                                    {
                                        _.get(serviceProviders, `data.${_.get(currentOrganization, 'id', '')}`, [])
                                    }
                                </Field>
                            </Grid>

                            <Grid item xs={6} sm={6} md={6} className={classes.item}>
                                <Field name="ward" label={I18n.t('ward')} component={renderSelect} onChange={(value) => {
                                    dispatch(Actions.fetchServiceWorkers({ serviceProviderId: currentServiceProvider.id, wardId: value.id }));
                                    setCurrentWard(value);
                                }
                                } >
                                    {
                                        _.get(wards, `data.${_.get(currentServiceProvider, 'id', '')}`, [])
                                    }
                                </Field>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} className={classes.item}>
                                <Field name="gt" label={I18n.t('gt')} component={renderSelect}
                                >
                                    {
                                        _.get(serviceWorkers, `data.${_.get(currentWard, 'id', '')}`, [])
                                    }
                                </Field>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} className={classes.item}>
                                <Field name="service" label={I18n.t('service')} component={renderSelect} onChange={(value) => {
                                    dispatch(Actions.fetchServiceIntervals({ serviceConfigId: value.id, serviceProviderId: currentServiceProvider?.id }));
                                    setCurrentServiceConfig(value);
                                }
                                } >
                                    {
                                        _.get(services, `data.${_.get(currentServiceProvider, 'id', '')}`, [])
                                    }
                                </Field>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} className={classes.item}>
                                <Field name="interval" label={I18n.t('interval')} component={renderSelect}>
                                    {
                                        _.get(serviceIntervals, `data.${_.get(currentServiceConfig, 'id', '')}`, [])
                                    }
                                </Field>
                            </Grid>

                            {
                                _.get(serviceIntervals, `data.${_.get(currentServiceConfig, 'id', '')}[0].residenceCategory`, []) === RESIDENTIAL_CATEGORIES.RESIDENTIAL && <Grid item xs={6} sm={6} md={6} className={classes.item}>
                                    <Field name="residence_type" label={I18n.t('residence_type')} component={renderSelect}
                                    >
                                        {
                                            _.get(residenceType, 'data', [])
                                        }
                                    </Field>
                                </Grid>


                            }{
                                _.get(serviceIntervals, `data.${_.get(currentServiceConfig, 'id', '')}[0].residenceCategory`, []) === RESIDENTIAL_CATEGORIES.NON_RESIDENTIAL &&
                                <Grid item xs={6} sm={6} md={6} className={classes.item}>
                                    <Field name="trading_type" label={I18n.t('trading_type')} component={renderSelect}>
                                        {
                                            _.get(tradingType, 'data', [])
                                        }
                                    </Field>
                                </Grid>
                            }
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Alert type='success' title={<strong>{cronstrue.toString(quartzCron)}</strong>} icon=' ' />
                                <Field name="cronExpression" label="Cron Expression" component={renderTextField} disabled={true} style={{ display: 'none' }} />
                                <FormControlLabel
                                    control={<Checkbox checked={showAdvanced} onChange={() => setShowAdvanced(!showAdvanced)} name="showAdvanced" />}
                                    label="show_advanced_filter"
                                />
                            </Grid>

                            {!showAdvanced && <Grid item xs={6} sm={6} md={6} className={classes.item}>
                                <Field name="simpleCron" label={I18n.t('interval')} component={renderSelect} onChange={(value) => {
                                    props.change('weekDay', getDropDowns(WEEK_DAYS)[0]);
                                    props.change('cronExpression', value.id);
                                    setQuartzCron(value.id);
                                    setWeeklyCron(value.id);
                                }
                                } >
                                    {
                                        getDropDowns(CRON_SIMPLE)
                                    }
                                </Field>
                            </Grid>}

                            {showWeekDays() && !showAdvanced && <Grid item xs={6} sm={6} md={6} className={classes.item}>
                                <Field name="weekDay" label={I18n.t('week_day')} component={renderSelect} onChange={(value) => {
                                    let exp = generateCronExpression(weeklyCron, value.id);
                                    setQuartzCron(exp);
                                    props.change('cronExpression', exp);
                                }
                                } >
                                    {
                                        getDropDowns(WEEK_DAYS)
                                    }
                                </Field>
                            </Grid>}

                            {showAdvanced && <ReCron value={quartzCron}
                                onChange={(value) => {
                                    setQuartzCron(value);
                                    props.change('cronExpression', value);
                                }}
                                cssClassPrefix="jit-" activeTab={Tab.MINUTES} tabs={[Tab.MINUTES, Tab.HOURS, Tab.DAY, Tab.MONTH, Tab.YEAR]} />
                            }
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                            <Button type="submit"> Search</Button>
                        </Grid>
                    </LoadingOverlay>

                </Form >
            </div>
        </CardComponent>

    );
};
export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].EditSchedule
}))(reduxForm({
    form: 'EditSchedule',
    enableReinitialize: true
})(SearchCustomers));
