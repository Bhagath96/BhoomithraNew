import React, { useEffect } from 'react';
import { Field, FieldArray, Form, reduxForm, reset } from 'redux-form';
import { useDispatch, useSelector, connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Components, I18n, Icons } from '../../../../common/components';
import { renderTextField, renderSelect, renderSimpleSelect } from '../../../../utils/FormUtils';
import { STATE_REDUCER_KEY } from '../../constants';
import _ from '../../../../utils/LodashUtils';
import { renderCard } from '../../../../assets/css/bhoom';
import * as Actions from '../../actions';
import { hasAccessPermission } from '../../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../../common/Permissions';
const { AddBoxTwoTone, DeleteForeverIcon } = Icons;
const { Grid, Button, IconButton, CardHeader, CardContent, Card, CardComponent, Colors, Typography, LoadingOverlay } = Components;

const checkIfDuplicateExists = (w) => {
    return new Set(w).size !== w.length;
};
const validate = values => {
    const errors = {};
    let newArray = [];
    let duplicateExist = false;
    if (!_.has(values, 'residenceCategory') || _.get(values, 'residenceCategory', '') === null) {
        _.set(errors, 'residenceCategory', I18n.t('required', { type: I18n.t('residence_category') }));
    }
    if (!_.has(values, 'serviceInterval') || _.get(values, 'serviceInterval', '') === null) {
        _.set(errors, 'serviceInterval', I18n.t('required', { type: I18n.t('service_interval') }));
    }
    if (!_.has(values, 'serviceType') || _.get(values, 'serviceType', '') === null) {
        _.set(errors, 'serviceType', I18n.t('required', { type: I18n.t('service_type') }));
    } else if (_.get(values, 'serviceType.id', null) === 1) {
        if (!_.has(values, 'serviceConfig') || _.get(values, 'serviceConfig', '') === null) {
            _.set(errors, 'serviceConfig', I18n.t('required', { type: I18n.t('service_config') }));
        }
        if (!_.has(values, 'serviceTemplates') || _.get(values, 'serviceTemplates', '') === null) {
            _.set(errors, 'serviceTemplates', I18n.t('required', { type: I18n.t('service_templates') }));
        }
    } else if (_.get(values, 'serviceType.id', null) === 2) {
        if (!_.has(values, 'bundledServiceConfig') || _.get(values, 'bundledServiceConfig', '') === null) {
            _.set(errors, 'bundledServiceConfig', I18n.t('required', { type: I18n.t('bundled_service_config') }));
        } else {
            if (!_.has(values, 'serviceTemplates') || _.get(values, 'serviceTemplates', '') === null) {
                _.set(errors, 'serviceTemplates', I18n.t('required', { type: I18n.t('service_templates') }));
            } else {
                const membersArrayErrors = [];
                values.serviceTemplates.forEach((member, memberIndex) => {
                    const memberErrors = {};
                    if (!member || !member.templateId) {
                        memberErrors.templateId = I18n.t('required', { type: I18n.t('template') });
                        membersArrayErrors[memberIndex] = memberErrors;
                    }

                    if (!member || !member.serviceConfigId) {
                        memberErrors.serviceConfigId = I18n.t('required', { type: I18n.t('service') });
                        membersArrayErrors[memberIndex] = memberErrors;
                    } else if (member.serviceConfigId) {
                        newArray.push(Number(member.serviceConfigId));
                    }
                    if (newArray.length > 0) {
                        duplicateExist = checkIfDuplicateExists(newArray);
                    }
                    if (duplicateExist === true && newArray.length > 0) {
                        memberErrors.serviceConfigId = I18n.t('same_values_error', { type: I18n.t('service') });
                        membersArrayErrors[memberIndex] = memberErrors;
                    }
                });

                if (membersArrayErrors.length) {
                    errors.serviceTemplates = membersArrayErrors;
                }
            }
        }


    }
    if (!_.has(values, 'paymentCollection') || _.get(values, 'paymentCollection', '') === null) {
        _.set(errors, 'paymentCollection', I18n.t('required', { type: I18n.t('payment_collection') }));
    }
    if (!_.has(values, 'sort') || _.get(values, 'sort', '') === null) {
        _.set(errors, 'sort', I18n.t('required', { type: I18n.t('sort') }));
    }
    if (_.get(values, 'rateType.name', '') === 'Slab Rate') {
        if (!_.has(values, 'slabs') || _.get(values, 'slabs', '')?.length === 0) {
            _.set(errors, 'slabs', I18n.t('required', { type: I18n.t('slabs') }));
        }
    }
    if (_.get(values, 'rateType.name', '') === 'Fixed Rate') {
        if (!_.has(values, 'fixedAmount') || _.get(values, 'fixedAmount', '') === null) {
            _.set(errors, 'fixedAmount', I18n.t('required', { type: I18n.t('fixed_amount') }));
        }
    }
    if (_.get(values, 'rateType.name', '') === 'Per Unit Rate') {
        if (!_.has(values, 'perUnitAmount') || _.get(values, 'perUnitAmount', '') === null) {
            _.set(errors, 'perUnitAmount', I18n.t('required', { type: I18n.t('per_unit_amount') }));
        }
    }
    if (_.get(values, 'paymentCollection.name', '') === 'Subscription') {
        if (!_.has(values, 'invoiceGenerationDay') || _.get(values, 'invoiceGenerationDay', '') === null) {
            _.set(errors, 'invoiceGenerationDay', I18n.t('required', { type: I18n.t('invoice_generation_day') }));
        }
        if (!_.has(values, 'invoiceDueDay') || _.get(values, 'invoiceDueDay', '') === null) {
            _.set(errors, 'invoiceDueDay', I18n.t('required', { type: I18n.t('due_day') }));
        }
        if (!_.has(values, 'invoiceInterval') || _.get(values, 'invoiceInterval', '') === null) {
            _.set(errors, 'invoiceInterval', I18n.t('required', { type: I18n.t('payment_interval') }));
        }
    }
    if (!_.has(values, 'rateType') || _.get(values, 'rateType', '') === null) {
        _.set(errors, 'rateType', I18n.t('required', { type: I18n.t('rate_type') }));
    }

    return errors;
};

const Accordion = withStyles({
    root: {
        boxShadow: 'none',
        borderBottom: 0,
        '&:before': {
            display: 'none'
        },
        '&$expanded': {
            margin: 'auto'
        }
    },
    expanded: {}
})(MuiAccordion);
const AccordionSummary = withStyles({
    root: {
        backgroundColor: Colors['color-success-transparent-100'],
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56
        }
    },
    content: {
        '&$expanded': {
            margin: '12px 0'
        }
    },
    expanded: {}
})(MuiAccordionSummary);

const renderLabelFieldArray = ({ fields = [], shortLabelDisplay,
    change, templates = { data: [] }, editLimit = null, services, title = I18n.t('templates') }) => {
    let length = fields.length;
    length < 1 && fields.push({});
    let versions = {};
    versions.data = templates.data.length > 0 ? templates.data.map(item => ({ id: _.get(item, 'id', ''), name: _.get(item, 'version', '') })) : [];
    return <Card Card style={renderCard.options} >
        <CardHeader
            action={
                <IconButton className='addButton' aria-label="Options" onClick={() => fields.push({})}>
                    {<AddBoxTwoTone />}
                </IconButton>
            }
            title={title}
        />
        <CardContent style={renderCard.content}>
            {fields.map((member, index) => (
                <Card key={index} style={renderCard.accordion}>
                    <Accordion defaultExpanded={true} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Grid container alignItems='center'>
                                <Grid item>
                                    <Typography>{`${I18n.t('service')} ${index + 1}`}</Typography>
                                </Grid>
                            </Grid>
                            {fields.length !== 1 && !(index < editLimit) && <Grid item xs={1} sm={1} md={1} >
                                <IconButton aria-label="Options" onClick={() => fields.remove(index)}>
                                    <DeleteForeverIcon />
                                </IconButton>
                            </Grid>}
                        </AccordionSummary>
                        <Grid container spacing={2} key={index} style={renderCard.gridCenter}>
                            <Grid item xs={shortLabelDisplay ? 3 : 4} >
                                <Field name={`${member}.serviceConfigId`} label={I18n.t('service')} disabled={index < editLimit ? true : false} component={renderSimpleSelect} onChange={(value) =>
                                    change(`${member}.serviceConfigId`, value.target.value)} >
                                    {
                                        _.get(services, 'data', [])
                                    }
                                </Field>
                            </Grid>
                            <Grid item xs={shortLabelDisplay ? 3 : 4} >
                                <Field name={`${member}.templateId`} label={I18n.t('template')} disabled={index < editLimit ? true : false} component={renderSimpleSelect} onChange={(value) => {
                                    change(`${member}.templateId`, value.target.value);
                                    let id = value.target.value;
                                    let obj = _.find(versions.data, ['id', id]);
                                    change(`${member}.version`, obj.name);
                                }}>
                                    {
                                        _.get(templates, 'data', [])
                                    }
                                </Field>
                            </Grid>
                            {<Grid item xs={shortLabelDisplay ? 3 : 4} >

                                {<Field name={`${member}.version`} label={I18n.t('version')} disabled={true} component={renderTextField}>

                                </Field>}
                            </Grid>}

                        </Grid>
                    </Accordion>
                </Card>
            ))}
            {
                fields.length < 1 ? <small style={{ color: 'red' }}>{I18n.t('required', { type: I18n.t('label') })}</small> : <small></small>
            }
        </CardContent>
    </Card >;
};
function CreateService(props) {
    const dispatch = useDispatch();
    const [checkValue, setCheckValue] = React.useState(false);
    const [slabFlag, setSlabFlag] = React.useState(true);
    const [perUnit, setPerUnit] = React.useState(true);
    const [fixedbFlag, setFixedFlag] = React.useState(false);
    const [serviceFlag, setserviceFlag] = React.useState(true);
    const [templateFlag, setTemplateFlag] = React.useState(false);
    const [editFlag, setEditFlag] = React.useState(false);
    const [bundleFlag, setbundleFlag] = React.useState(true);
    const [editLimit, setEditLimit] = React.useState(null);
    const [subscriptionFields, setSubscriptionFields] = React.useState(false);
    const [hideSubscriptionDependsFields, setHideSubscriptionDependsFields] = React.useState(false);
    const { id, providerId, serviceId } = useParams();
    const { handleSubmit, submitting, change } = props;
    const { listResidenceCategory, listServiceType, listPaymentCollection, listPaymentIntervalDetails, listRateType, listServiceIntervel, listBundledOrServiceConfig, listServiceChargeSlab, listServiceById, templates, services = [] } = useSelector(state => state[STATE_REDUCER_KEY]);

    const arrayGenerator = (min, max) => {
        let numArray = [];
        for (let i = min; i <= max; i++) {
            let item = { id: i, name: i };
            numArray.push(item);
        }
        return numArray;
    };
    const checkBoxClick = () => {
        setCheckValue(!checkValue);
    };

    const subscriptionClicked = (value) => {

        if (value === 'Subscription') {
            setSubscriptionFields(true);
            change('rateType', _.find(_.get(listRateType, 'data', []), { id: 1 }));
            setHideSubscriptionDependsFields(true);
        }
        if (value === 'Collection') {
            setSubscriptionFields(false);
            change('invoiceGenerationDay', null);
            change('invoiceDueDay', null);
            change('invoiceInterval', null);
            change('rateType', null);
            setHideSubscriptionDependsFields(false);
        }

    };
    useEffect(() => {
        props.change('specialService', checkValue);
        props.change('serviceInterval', checkValue ? _.filter(listServiceIntervel.data, (item) => item.name === 'Date')[0] : null);
    }, [checkValue]);
    useEffect(() => {
        if (serviceId) {
            dispatch(Actions.getServiceById(serviceId));
            setEditFlag(true);
        }
        dispatch(Actions.loadTemplates(id));
        dispatch(Actions.getResidentialCategory());
        dispatch(Actions.getServiceCategory());
        dispatch(Actions.getServiceType());
        dispatch(Actions.getPaymentCollection());
        dispatch(Actions.getPaymentIntervalDetails());
        dispatch(Actions.getRateType());
        dispatch(Actions.getServiceInterval());
        dispatch(Actions.getServiceChargeSlab());
        return (() => {
            reset();
        });
    }, []);

    useEffect(() => {

        if (listServiceById?.data?.serviceType?.id === 2) {//bundled service
            setbundleFlag(false);
            setserviceFlag(true);
            setTemplateFlag(true);
            change('serviceConfig', null);
            dispatch(Actions.loadServices(listServiceById?.data?.bundledServiceConfig?.id));
        }
        if (listServiceById?.data?.paymentCollection?.id === 1) {
            //subscriptionClicked(_.get(listServiceById, 'data.paymentCollection', null));
            setSubscriptionFields(true);
            setHideSubscriptionDependsFields(true);
        }
        if (listServiceById?.data?.serviceType?.id === 1) {// service
            setserviceFlag(false);
            setbundleFlag(true);
            setTemplateFlag(false);
            change('bundledServiceConfig', null);
            let tempArray = _.get(listServiceById, 'data.serviceTemplates', []);
            let tempObj = {
                id: _.get(tempArray, '0.templateId', null),
                name: _.get(tempArray, '0.name', '')
            };
            change('serviceTemplates', tempObj);
        }
        if (listServiceById?.data?.rateType?.name === 'Slab Rate') {
            setSlabFlag(false);
            setFixedFlag(true);
            setPerUnit(true);
        }
        if (listServiceById?.data?.rateType?.name === 'Fixed Rate') {
            setFixedFlag(true);
            setSlabFlag(false);
            setPerUnit(false);
        }
        if (listServiceById?.data?.rateType?.name === 'Per Unit Rate') {
            setPerUnit(false);
            setSlabFlag(true);
            setFixedFlag(true);
        }
        if (listServiceById?.data?.serviceTemplates?.length > 0) {
            setEditLimit(listServiceById?.data?.serviceTemplates?.length);
        }
        if (listServiceById?.data?.specialService) {
            setCheckValue(listServiceById?.data?.specialService);
        }
        dispatch(Actions.fetchBundledOrServiceConfig(listServiceById?.data?.serviceType?.id));

    }, [listServiceById]);

    const submit = (values) => {

        let slabs = _.get(values, 'slabs', []);
        let newObj = {
            organizationServiceProviderId: Number(providerId) || 0,
            residenceCategoryId: _.get(values, 'residenceCategory.id', null),
            serviceConfigId: _.get(values, 'serviceConfig.id', null),
            paymentCollectionId: _.get(values, 'paymentCollection.id', null),
            serviceTypeId: _.get(values, 'serviceType.id', null),
            rateTypeId: _.get(values, 'rateType.id', null),
            serviceIntervalId: _.get(values, 'serviceInterval.id', null),
            fixedAmount: Number(_.get(values, 'fixedAmount', 0)),
            specialService: false,
            sort: Number(_.get(values, 'sort', 0)),
            bundledServiceConfigId: _.get(values, 'bundledServiceConfig.id', null),
            perUnitAmount: Number(_.get(values, 'perUnitAmount', null)),
            slabIds: _.map(slabs, 'id'),
            serviceTemplates: null
        };
        if (_.get(values, 'paymentCollection.id', 0) === 1) {
            newObj.invoiceGenerationDay = _.get(values, 'invoiceGenerationDay.id', null);
            newObj.invoiceDueDay = _.get(values, 'invoiceDueDay.id', null);
            newObj.invoiceIntervalId = _.get(values, 'invoiceInterval.id', null);
        }
        if (values.specialService) {
            newObj.specialService = values.specialService;
        }
        _.set(newObj, 'serviceTemplates', templateFlag ? _.get(values, 'serviceTemplates', []) : [{
            templateId: _.get(values, 'serviceTemplates.id', null), serviceConfigId: newObj.serviceConfigId, ..._.get(values, 'serviceTemplates.0', null)
        }]);
        if (serviceId) {
            _.set(newObj, 'serviceTemplates', _.get(listServiceById, 'data.serviceTemplates'));
            dispatch(Actions.editObjectForService(newObj, id, providerId, serviceId));
        } else {
            dispatch(Actions.sentObjectForService(newObj, id, providerId));
        }
    };

    const serviceTypeButtonClick = (value) => {
        if (value === 1) {
            setserviceFlag(false);
            setbundleFlag(true);
            setTemplateFlag(false);
            change('bundledServiceConfig', null);
        }
        if (value === 2) {
            setbundleFlag(false);
            setserviceFlag(true);
            change('serviceConfig', null);
        }
    };

    const buttonClicked = (value) => {
        if (value === 'Slab Rate') {
            dispatch(Actions.getServiceChargeSlab());
            change('perUnitAmount', null);
            change('fixedAmount', null);
            setSlabFlag(false);
            setFixedFlag(true);
            setPerUnit(true);
        }
        if (value === 'Fixed Rate') {
            dispatch(Actions.emptySlabArray());
            change('slabs', []);
            change('perUnitAmount', null);
            setFixedFlag(false);
            setSlabFlag(true);
            setPerUnit(true);
        }
        if (value === 'Per Unit Rate') {
            dispatch(Actions.emptySlabArray());
            change('slabs', []);
            change('fixedAmount', null);
            setPerUnit(false);
            setSlabFlag(true);
            setFixedFlag(true);
        }
    };

    const readOnly = hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_SERVICE_DETAILS, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_SERVICE_DETAILS.READ_ONLY);


    return (
        <div>
            <CardComponent >
                <LoadingOverlay active={listServiceById.requestInProgress}>
                    <Form onSubmit={handleSubmit(submit)}>
                        <Grid container justify='flex-start' spacing={2}>
                            <Grid item xs={6}>
                                <Field name='residenceCategory' label={I18n.t('residence_category')} disabled={readOnly} component={renderSelect}
                                    onChange={() => {
                                        if (!serviceId) {
                                            change('serviceType', null);
                                            change('bundledServiceConfig', null);
                                            change('serviceConfigId', null);
                                        }
                                    }}
                                >
                                    {
                                        listResidenceCategory.data?.map(item => ({ id: item.id, name: item.name }))


                                    }
                                </Field>

                            </Grid>
                            <Grid item xs={6} >
                                <Field spinnerProps="selectTagProp" name='serviceType' label={I18n.t('service_type')} component={renderSelect} disabled={editFlag} style={{ backgroundColor: 'blue' }}
                                    onChange={(resourceItem) => {

                                        serviceTypeButtonClick(resourceItem.id);
                                        dispatch(Actions.fetchBundledOrServiceConfig(resourceItem.id));
                                        dispatch(Actions.resetbundledServiceConfig());
                                        change('bundledServiceConfig', null);
                                        change('serviceTemplates', null);


                                    }}>
                                    {

                                        _.get(listServiceType, 'data', [])

                                    }
                                </Field>
                            </Grid>
                            {!readOnly &&
                                <Grid item xs={6}>
                                    <Field component="input" name='specialService' type="checkbox" onClick={() => checkBoxClick()} /><span>{I18n.t('special_service')}</span><br /><br />
                                </Grid>
                            }
                            {bundleFlag && <Grid item xs={6} >
                                <Field spinnerProps="selectTagProp" name='serviceTemplates' label={I18n.t('templates')} component={renderSelect} disabled={serviceFlag || editFlag}
                                >
                                    {

                                        _.get(templates, 'data', [])

                                    }
                                </Field>

                            </Grid>}

                            {bundleFlag && <Grid item xs={6} >
                                <Field spinnerProps="selectTagProp" name='serviceConfig' label={I18n.t('service')} component={renderSelect} disabled={serviceFlag || editFlag}
                                >
                                    {

                                        _.get(listBundledOrServiceConfig, 'data', [])

                                    }
                                </Field>

                            </Grid>}


                            <Grid item xs={6} >
                                <Field spinnerProps="selectTagProp" name='bundledServiceConfig' label={I18n.t('bundled_service')} component={renderSelect} disabled={bundleFlag || editFlag}
                                    onChange={(resourceItem) => {

                                        dispatch(Actions.loadServices(resourceItem.id));
                                        setTemplateFlag(true);
                                    }}>
                                    {

                                        _.get(listBundledOrServiceConfig, 'data', [])


                                    }
                                </Field>

                            </Grid>
                            {templateFlag && <Grid item xs={12} sm={12} md={12}>
                                <FieldArray dispatch={dispatch} name="serviceTemplates" component={renderLabelFieldArray}
                                    templates={templates} services={services}
                                    change={change} editLimit={editLimit}
                                />

                            </Grid>}
                            <Grid item xs={6} >
                                <Field spinnerProps="selectTagProp" name='paymentCollection' label={I18n.t('payment_collection')} disabled={readOnly} component={renderSelect}
                                    onChange={(subcriptionItem) => {

                                        subscriptionClicked(subcriptionItem.name);
                                    }}
                                >
                                    {

                                        _.get(listPaymentCollection, 'data', [])

                                    }
                                </Field>

                            </Grid>
                            <Grid item xs={6} >
                                <Field spinnerProps="selectTagProp" name='rateType' label={I18n.t('rate_type')} component={renderSelect} disabled={hideSubscriptionDependsFields}
                                    onChange={(resourceItem) => {

                                        buttonClicked(resourceItem.name);

                                    }}>
                                    {

                                        _.get(listRateType, 'data', [])

                                    }
                                </Field>

                            </Grid>
                            <Grid item xs={6} >
                                <Field spinnerProps="selectTagProp" name='serviceInterval' label={I18n.t('service_interval')} disabled={readOnly} component={renderSelect}
                                >
                                    {

                                        checkValue ? _.filter(listServiceIntervel.data, (item) => item.name === 'Date') : _.get(listServiceIntervel, 'data', [])
                                    }
                                </Field>

                            </Grid>

                            <Grid item xs={6} >
                                <Field spinnerProps="selectTagProp" name='slabs' label={I18n.t('service_charge_slab')} component={renderSelect} multiple={true} disabled={slabFlag}>
                                    {
                                        _.get(listServiceChargeSlab, 'data', [])

                                    }
                                </Field>

                            </Grid>
                            <Grid item xs={6}>
                                <Field name="sort" label={I18n.t('sort')} type='number' component={renderTextField} disabled={readOnly} />
                            </Grid>
                            <Grid item xs={6}>
                                <Field name="fixedAmount" label={I18n.t('fixed_amount')} type='number' component={renderTextField} disabled={fixedbFlag} />
                            </Grid>
                            <Grid item xs={6}>
                                <Field name="perUnitAmount" label={I18n.t('per_unit_amount')} type='number' component={renderTextField} disabled={perUnit} />
                            </Grid>
                            {subscriptionFields && <Grid item xs={6}>
                                <Field name="invoiceGenerationDay" label={I18n.t('invoice_generation_day')} disabled={editFlag} component={renderSelect} >
                                    {
                                        arrayGenerator(1, 15)
                                    }
                                </Field>
                            </Grid>}
                            {subscriptionFields && <Grid item xs={6}>
                                <Field name="invoiceDueDay" label={I18n.t('due_day')} disabled={editFlag} component={renderSelect} >
                                    {
                                        arrayGenerator(16, 28)
                                    }
                                </Field>
                            </Grid>}
                            {subscriptionFields && <Grid item xs={6}>
                                <Field name="invoiceInterval" label={I18n.t('payment_interval')} disabled={editFlag} component={renderSelect} >
                                    {

                                        _.get(listPaymentIntervalDetails, 'data', [])

                                    }
                                </Field>
                            </Grid>}


                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Button type="submit" disabled={submitting} >{serviceId ? I18n.t('update') : I18n.t('submit')}</Button>
                            </Grid>
                        </Grid>
                    </Form>
                </LoadingOverlay>
            </CardComponent>


        </div >
    );
}

export default connect(state => ({
    initialValues: _.get(state, `${STATE_REDUCER_KEY}.listServiceById.data`, {})
}))(reduxForm({
    form: 'CreateServiceAdminsForm',
    enableReinitialize: true,
    validate
})(CreateService));
