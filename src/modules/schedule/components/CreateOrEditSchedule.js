import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Components, I18n, makeStyles } from '../../../common/components';
import * as Actions from '../actions';
import { STATE_REDUCER_KEY, CRON_EXPRESSIONS, WEEK_DAYS, MONTH_NAMES, RESIDENTIAL_CATEGORIES } from '../constants';
import { ReCron, Tab } from '@sbzen/re-cron';
import { Field, Form, reduxForm } from 'redux-form';
import { renderSelect } from '../../../utils/FormUtils';
import LoadingOverlay from '../../../common/components/custom/LoadingOverlay.js';
import cronstrue from 'cronstrue';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { submitSchedule } from '../validations';
import { FORM_NAME, DAYS } from '../constants';
import { useParams } from 'react-router';
import { convertToLocal } from '../../../utils/DateUtils';
import { showNotification } from '../../common/actions';
import { getEmptyPicky } from '../../../utils/CommonUtils';
import { MESSAGE_TYPES } from '../../common/constants';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';

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
    },
    card: {
        marginTop: '10px'
    }
}));

const generateCronExpression = (current, data) => {
    const expArray = _.split(current, ' ');
    expArray[5] = data;
    return _.join(expArray, ' ');
};

const generateCroneExpressionForDate = (current, data) => {
    let expArray = _.split(current, ' ');
    expArray[3] = data;
    return _.join(expArray, ' ');
};

const generateCroneExpressionForParticularDate = (currentCronExp, selectedDate) => {
    const d = new Date(selectedDate);
    let month = MONTH_NAMES[d.getMonth()];
    let year = d.getFullYear();
    let day = d.getDate();
    month = month.substr(0, 3).toUpperCase();
    let expArray = _.split(currentCronExp, ' ');
    expArray[3] = day;
    expArray[4] = month;
    expArray[6] = year;
    return _.join(expArray, ' ');
};
const maxDateFinder = () => {
    let currentDate = new Date();
    let monthOfCurrentDate = currentDate.getMonth() + 1;
    let currentDayFromActualDate = currentDate.getDate();
    let currentYearFromActualDate = currentDate.getFullYear();
    if (monthOfCurrentDate !== 12) {
        let newxmonth = monthOfCurrentDate + 1;
        let monthOfCurrentDateInString = newxmonth.toString();

        let futureDate = currentYearFromActualDate + '-' + (monthOfCurrentDateInString.length === 1 ? ('0' + (newxmonth)) : (newxmonth)) + '-' + currentDayFromActualDate;
        return futureDate;
    } else {
        let futureDate = (currentYearFromActualDate + 1) + '-' + ('0' + (1)) + '-' + currentDayFromActualDate;
        return futureDate;
    }

};

const CreateOrEditSchedule = (props) => {
    let currentDate = null;
    currentDate = new Date().toISOString().slice(0, 10);
    let maxDate = maxDateFinder();
    const dispatch = useDispatch();
    const classes = useStyles();
    const { id: isId } = useParams();
    const id = isId === 'create' ? null : isId;
    const { change, handleSubmit } = props;
    const {
        serviceIntervals = {},
        organizations = {}, serviceProviders = {},
        wards = {}, serviceWorkers = {}, services = {}, residenceType = {},
        tradingType = {}, residenceCategory = {},
        schedule = {}
    } = useSelector(state => state[STATE_REDUCER_KEY]);
    const { Schedule: { values: formValues = {} } = {} } = useSelector(state => state.form);
    const { serviceInterval = {} } = formValues;

    const [quartzCron, setQuartzCron] = React.useState(CRON_EXPRESSIONS.EVERY_DAY);
    const [weeklyCron, setWeeklyCron] = React.useState({});
    const [fetchedDate, setFetchedDate] = useState();
    const [currentOrganization, setCurrentOrganization] = React.useState({});
    const [currentResidenceCategory, setCurrentResidenceCategory] = React.useState({});
    const [currentServiceProvider, setCurrentServiceProvider] = React.useState({});
    const [currentWard, setCurrentWard] = React.useState({});
    const [currentServiceConfig, setCurrentServiceConfig] = React.useState({});
    const [showAdvanced, setShowAdvanced] = React.useState(false);
    useEffect(() => {
        dispatch(Actions.clearSchedule());
    }, []);
    useEffect(() => {
        if (id) {
            dispatch(Actions.fetchScheduleById(id));
        }
        dispatch(Actions.fetchOrganizationsList());
        dispatch(Actions.fetchAllResidenceCategories());
        dispatch(Actions.fetchTradingType());
        return () => {
            dispatch(Actions.clearSchedule());
        };
    }, []);
    useEffect(() => {
        let { data: scheduleData = {} } = schedule;
        setCurrentServiceConfig(_.get(scheduleData, 'serviceConfig', {}));
        let serviceConfigId = _.get(scheduleData, 'serviceConfig.id', null);
        let serviceProviderId = _.get(scheduleData, 'serviceProvider.id', null);
        let residenceCategoryId = _.get(scheduleData, 'residenceCategory.id', null);
        if (serviceConfigId !== null && serviceProviderId !== null && residenceCategoryId !== null) {
            dispatch(Actions.fetchServiceIntervals({ serviceConfigId, serviceProviderId, residenceCategoryId }));
        }
        setQuartzCron(scheduleData?.cronExpression || CRON_EXPRESSIONS.EVERY_DAY);
        setWeeklyCron(scheduleData?.serviceInterval?.cronExpression || CRON_EXPRESSIONS.EVERY_WEEK);
        props.change('days', _.get(scheduleData, 'serviceInterval.day', null));
        props.change('weekDay', _.get(scheduleData, 'serviceInterval.weekDay', ''));
        setFetchedDate(_.get(scheduleData, 'serviceInterval.date', ''));
    }, [schedule]);

    const getDropDowns = (data = []) => data.map((value) => {
        return { id: value.id, name: I18n.t(value.name) };
    });

    const showIntervalDependents = (type) => (_.get(serviceInterval, 'cronExpression', '') === type ? true : false);

    const submit = (values) => {
        let objectToSent = {
            // cronExpression: quartzCron
        };
        let cronExpression = _.get(values, 'cronExpression', null);
        if (cronExpression !== null) {
            objectToSent.cronExpression = cronExpression;
        }
        let organizationId = _.get(values, 'organization.id', null);
        if (organizationId !== null) {
            objectToSent.organizationId = organizationId;
        }
        let serviceProviderId = _.get(values, 'serviceProvider.id', null);
        if (serviceProviderId !== null) {
            objectToSent.serviceProviderId = serviceProviderId;
        }
        let wardId = _.get(values, 'ward.id', null);
        if (wardId !== null) {
            objectToSent.wardId = wardId;
        }
        let serviceWorkerId = _.get(values, 'serviceWorker.id', null);
        if (serviceWorkerId !== null) {
            objectToSent.serviceWorkerId = serviceWorkerId;
        }
        let residenceCategoryId = _.get(values, 'residenceCategory.id', null);
        if (residenceCategoryId !== null) {
            objectToSent.residenceCategoryId = residenceCategoryId;
            let refId = (residenceCategoryId === RESIDENTIAL_CATEGORIES.RESIDENTIAL) ? _.get(values, 'residenceType.id', null) : (residenceCategoryId === RESIDENTIAL_CATEGORIES.NON_RESIDENTIAL) ? _.get(values, 'tradingType.id', null) : null;
            if (refId !== null) {
                objectToSent.refId = refId;
            }
        }
        let serviceIntervalId = _.get(values, 'serviceInterval.id', null);
        if (serviceIntervalId !== null) {
            objectToSent.serviceIntervalId = serviceIntervalId;
        }
        let serviceConfigId = _.get(values, 'serviceConfig.id', null);
        if (serviceConfigId !== null) {
            objectToSent.serviceConfigId = serviceConfigId;
        }
        if (id) {
            dispatch(Actions.updateSchedule({ ...objectToSent, id }));
        } else {
            dispatch(Actions.postSchedule(objectToSent));
        }
    };

    const readOnly = hasAccessPermission(RESOURCE_MAPPING.SCHEDULE_LIST_SCHEDULE_DETAILS, ACTION_MAPPING.SCHEDULE_LIST_SCHEDULE_DETAILS.READ_ONLY);

    return (
        <Form onSubmit={handleSubmit(submit)}>
            <LoadingOverlay active={schedule.requestInProgress || false}>
                <CardComponent>
                    <Grid container className={classes.item}>
                        {!id && <Grid item xs={6} sm={6} md={6} className={classes.item}>
                            <Field disabled={!!id} name="organization" label={I18n.t('organization')} component={renderSelect} onChange={(value) => {
                                dispatch(Actions.fetchServiceProvidersList(value.id));
                                setCurrentOrganization(value);
                                change('serviceProvider', null);
                                setCurrentServiceProvider({});
                                change('ward', null);
                                setCurrentWard({});
                                change('serviceWorker', null);
                                change('residenceCategory', null);
                                change('serviceConfig', null);
                                setCurrentServiceConfig({});
                                change('serviceInterval', null);
                                setCurrentResidenceCategory({});
                                change('residenceType', null);
                                change('tradingType', null);
                                setQuartzCron(CRON_EXPRESSIONS.EVERY_DAY);
                            }
                            } >
                                {
                                    _.get(organizations, 'data', [])
                                }
                            </Field>
                        </Grid>}

                        <Grid item xs={6} sm={6} md={6} className={classes.item}>
                            <Field disabled={!!id} name="serviceProvider" label={I18n.t('service_provider')} component={renderSelect} onChange={(value) => {
                                dispatch(Actions.fetchWards({ organizationId: currentOrganization.id, serviceProviderId: value.id }));
                                setCurrentServiceProvider(value);
                                change('ward', null);
                                setCurrentWard({});
                                change('serviceWorker', null);
                                change('residenceCategory', null);
                                change('serviceConfig', null);
                                setCurrentServiceConfig({});
                                change('serviceInterval', null);
                                setCurrentResidenceCategory({});
                                change('residenceType', null);
                                change('tradingType', null);
                                setQuartzCron(CRON_EXPRESSIONS.EVERY_DAY);
                            }
                            } >
                                {
                                    _.get(serviceProviders, `data.${_.get(currentOrganization, 'id', '')}`, [])
                                }
                            </Field>
                        </Grid>

                        <Grid item xs={6} sm={6} md={6} className={classes.item}>
                            <Field disabled={!!id} name="ward" label={I18n.t('ward')} component={renderSelect} onChange={(value) => {
                                //Currently no relations in DB For GT and Service, so fetching service details here
                                // and Ward Id is req. on changing service
                                dispatch(Actions.fetchServiceWorkers({ serviceProviderId: currentServiceProvider.id, wardId: value.id }));
                                setCurrentWard(value);
                                change('serviceWorker', null);
                                change('residenceCategory', null);
                                change('serviceConfig', null);
                                setCurrentServiceConfig({});
                                change('serviceInterval', null);
                                setCurrentResidenceCategory({});
                                change('residenceType', null);
                                change('tradingType', null);
                                setQuartzCron(CRON_EXPRESSIONS.EVERY_DAY);
                            }
                            } >
                                {
                                    _.filter(_.get(wards, `data.${_.get(currentServiceProvider, 'id', '')}`, []), ['member', true])
                                }
                            </Field>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} className={classes.item}>
                            <Field disabled={!!id} name="serviceWorker" label={I18n.t('gt')} component={renderSelect} >
                                {
                                    _.get(serviceWorkers, `data.${_.get(currentWard, 'id', '')}`, [])
                                }
                            </Field>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} className={classes.item}>
                            <Field disabled={!!id} name="residenceCategory" label={I18n.t('residence_category')} component={renderSelect} onChange={(value) => {
                                setCurrentResidenceCategory(value);
                                if (_.get(value, 'id', 0) === RESIDENTIAL_CATEGORIES.RESIDENTIAL) {
                                    if (_.get(currentWard, 'id', null) === null) {
                                        dispatch(showNotification({ message: I18n.t('required', { type: I18n.t('ward') }), type: MESSAGE_TYPES.WARNING }));
                                    } else {
                                        dispatch(Actions.fetchResidentialAssociations({ wardId: currentWard.id }));
                                    }
                                }
                                dispatch(Actions.fetchServiceDetails({ serviceProviderId: currentServiceProvider.id, residenceCategoryId: value.id }));
                                change('serviceConfig', null);
                                setCurrentServiceConfig({});
                                change('serviceInterval', null);
                                change('residenceType', null);
                                change('tradingType', null);
                                setQuartzCron(CRON_EXPRESSIONS.EVERY_DAY);
                            }
                            } >
                                {
                                    _.get(residenceCategory, 'data', [])
                                }
                            </Field>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} className={classes.item}>
                            <Field disabled={!!id} name="serviceConfig" label={I18n.t('service')} component={renderSelect} onChange={(value) => {
                                setCurrentServiceConfig(value);
                                let serviceConfigId = _.get(value, 'id', null);
                                let residenceCategoryId = _.get(currentResidenceCategory, 'id', null);
                                let serviceProviderId = _.get(currentServiceProvider, 'id', null);
                                if (serviceConfigId === null) {
                                    dispatch(showNotification({ message: I18n.t('required', { type: I18n.t('service') }), type: MESSAGE_TYPES.WARNING }));
                                } else if (residenceCategoryId === null) {
                                    dispatch(showNotification({ message: I18n.t('required', { type: I18n.t('residence_category') }), type: MESSAGE_TYPES.WARNING }));
                                } else if (serviceProviderId === null) {
                                    dispatch(showNotification({ message: I18n.t('required', { type: I18n.t('service_provider') }), type: MESSAGE_TYPES.WARNING }));
                                } else {
                                    dispatch(Actions.fetchServiceIntervals({ serviceConfigId, serviceProviderId, residenceCategoryId }));
                                }
                                change('serviceInterval', null);
                                setQuartzCron(CRON_EXPRESSIONS.EVERY_DAY);
                            }
                            } >
                                {
                                    _.get(services, `data.${_.get(currentResidenceCategory, 'id', '')}`, [])
                                }
                            </Field>
                        </Grid>
                        {id && <Grid item xs={6} sm={6} md={6} className={classes.item}>
                            <Field disabled={!!id} name="lastExecutionDate" label={I18n.t('last_execution_date')} component={renderSelect}
                            >
                                {
                                    [{ id: 1, name: convertToLocal(_.get(services, 'data.lastExecutionDate', '')) }]
                                }
                            </Field>
                        </Grid>}
                        {id && <Grid item xs={6} sm={6} md={6} className={classes.item}>
                            <Field disabled={!!id} name="nextExecutionDate" label={I18n.t('next_execution_date')} component={renderSelect}
                            >
                                {
                                    [{ id: 1, name: _.get(services, 'data.nextExecutionDate', '') }]
                                }
                            </Field>
                        </Grid>}
                        {_.get(currentResidenceCategory, 'id', 0) === RESIDENTIAL_CATEGORIES.RESIDENTIAL &&
                            <Grid item xs={6} sm={6} md={6} className={classes.item}>
                                <Field disabled={!!id} name="residenceType" label={I18n.t('residence_associations')} component={renderSelect}
                                >
                                    {
                                        [getEmptyPicky(), ..._.get(residenceType, `data.${_.get(currentWard, 'id', '')}`, [])]
                                    }
                                </Field>
                            </Grid>}
                        {_.get(currentResidenceCategory, 'id', 0) === RESIDENTIAL_CATEGORIES.NON_RESIDENTIAL &&
                            <Grid item xs={6} sm={6} md={6} className={classes.item}>
                                <Field disabled={!!id} name="tradingType" label={I18n.t('trading_type')} component={renderSelect}>
                                    {
                                        [getEmptyPicky(), ..._.get(tradingType, `data.${_.get(currentResidenceCategory, 'id', '')}`, [])]
                                    }
                                </Field>
                            </Grid>
                        }
                        <Grid item xs={6} sm={6} md={6} className={classes.item}>
                            <Field name="serviceInterval" label={I18n.t('interval')} disabled={readOnly} component={renderSelect} onChange={(value) => {
                                props.change('weekDay', getDropDowns(WEEK_DAYS)[0]);
                                props.change('days', getDropDowns(DAYS)[0]);
                                props.change('cronExpression', value.cronExpression);
                                setQuartzCron(value.cronExpression);
                                setWeeklyCron(value.cronExpression);
                                setFetchedDate('');
                            }} >
                                {
                                    _.get(serviceIntervals, `data.${_.get(currentServiceConfig, 'id', '')}`, [])
                                }
                            </Field>
                        </Grid>
                        {showIntervalDependents(CRON_EXPRESSIONS.EVERY_WEEK) && !showAdvanced && <Grid item xs={6} sm={6} md={6} className={classes.item}>
                            <Field name="weekDay" label={I18n.t('week_day')} component={renderSelect} onChange={(value) => {
                                let exp = generateCronExpression(weeklyCron, value.id);
                                setQuartzCron(exp);
                                props.change('cronExpression', exp);
                            }} >
                                {
                                    getDropDowns(WEEK_DAYS)
                                }
                            </Field>
                        </Grid>}
                        {showIntervalDependents(CRON_EXPRESSIONS.EVERY_MONTH) && !showAdvanced && <Grid item xs={6} sm={6} md={6} className={classes.item}>
                            <Field name="days" label={I18n.t('day')} component={renderSelect} onChange={(value) => {
                                let exp = generateCroneExpressionForDate(weeklyCron, value.id);
                                setQuartzCron(exp);
                                props.change('cronExpression', exp);
                            }} >
                                {
                                    getDropDowns(DAYS)

                                }
                            </Field>
                        </Grid>}
                        {showIntervalDependents(CRON_EXPRESSIONS.EVERY_DATE) && !showAdvanced &&
                            <Grid item xs={6} sm={6} md={6} className={classes.item}>
                                <label>Date</label><br></br>
                                <input value={fetchedDate} type='date' name='datePicker' disabled={readOnly} min={currentDate} max={maxDate} onChange={(event) => {
                                    setFetchedDate(event.target.value);
                                    let exp = generateCroneExpressionForParticularDate(weeklyCron, event.target.value);
                                    setQuartzCron(exp);
                                    props.change('cronExpression', exp);
                                }} />
                            </Grid>
                        }
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Alert type='success' title={<strong>{cronstrue.toString(quartzCron)}</strong>} icon=' ' />
                            {hasAccessPermission(RESOURCE_MAPPING.SCHEDULE_CREATE_SCHEDULE, ACTION_MAPPING.SCHEDULE_CREATE_SCHEDULE.SHOW_ADVANCED_FILTER) || hasAccessPermission(RESOURCE_MAPPING.SCHEDULE_LIST_SCHEDULE_DETAILS, ACTION_MAPPING.SCHEDULE_LIST_SCHEDULE_DETAILS.SHOW_ADVANCED_FILTER) && <FormControlLabel
                                control={<Checkbox checked={showAdvanced} onChange={() => setShowAdvanced(!showAdvanced)} name="showAdvanced" />}
                                label={I18n.t('show_advanced_filter')}
                            />}
                        </Grid>
                        {showAdvanced && <ReCron value={quartzCron}
                            onChange={(value) => {
                                setQuartzCron(value);
                                props.change('cronExpression', value);
                            }}
                            cssClassPrefix="jit-" activeTab={Tab.MINUTES} tabs={[Tab.MINUTES, Tab.HOURS, Tab.DAY, Tab.MONTH, Tab.YEAR]} />
                        }
                    </Grid>
                    {!readOnly &&
                        <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                            <Button type='submit'> {id ? I18n.t('update') : I18n.t('create')}</Button>
                        </Grid>
                    }
                </CardComponent>
            </LoadingOverlay>
        </Form >
    );
};

export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].schedule?.data
}))(reduxForm({
    validate: submitSchedule,
    form: FORM_NAME,
    enableReinitialize: true
})(CreateOrEditSchedule));
