import React, { useEffect } from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { renderTextField, renderSimpleSelect } from '../../../../utils/FormUtils';
import { Components, I18n, makeStyles } from '../../../../common/components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../actions';
import { STATE_REDUCER_KEY } from '../../constants';
import _ from 'lodash';
const { Grid, Button, LoadingOverlay, CardComponent } = Components;

const validate = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = I18n.t('required', { type: I18n.t('name') });
    }
    if (!values.serviceProviderType) {
        errors.serviceProviderType = I18n.t('required', { type: I18n.t('service_provider_type') });
    }

    if (!values.templateTypesForOrg) {
        errors.templateTypesForOrg = I18n.t('required', { type: I18n.t('template_type') });
    }
    return errors;
};
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
const AddServiceProvider = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { handleSubmit } = props;
    const { change } = props;
    const initialValues = useSelector(state => state[STATE_REDUCER_KEY]);
    const { serviceProvider, templateTypes } = initialValues;
    useEffect(() => {
        dispatch(Actions.getServiceProvider());
        dispatch(Actions.getTemplateTypes());
    }, []);
    const submit = (values) => {
        const { name, serviceProviderTypeId } = values;
        const templateTypeId = _.get(values, 'templateTypeId.id');
        dispatch(Actions.postServiceProviders({ templateTypeId, name, serviceProviderTypeId }, id));
    };
    const serviceProviderChange = (value) => {
        const filterData = _.filter(serviceProvider.data, ['pk', value]);
        const filterTemplate = _.get(filterData[0], 'templateType', {});
        change('templateTypeId', filterTemplate);

    };
    return (
        <CardComponent>
            <Form onSubmit={handleSubmit(submit)}>
                <LoadingOverlay active={false}>
                    <Grid container className={classes.item}>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field name="name" label={I18n.t('name')} component={renderTextField} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field name="serviceProviderType" label={I18n.t('service_provider_type')} component={renderSimpleSelect} onChange={(value) => {
                                change('serviceProviderTypeId', value.target.value);
                                serviceProviderChange(value.target.value);
                            }} >
                                {
                                    serviceProvider.data?.map(item => ({ id: item.pk, name: item.name }))
                                }
                            </Field>
                            <Field name="templateTypeId" label={I18n.t('template_type')} disabled={true} component={renderSimpleSelect} onChange={(value) => {
                                change('templateTypeId', value.target.value);
                            }}
                            >
                                {
                                    templateTypes.data?.map(item => ({ id: item.id, name: item.name }))
                                }
                            </Field>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                        <Button type="submit">{I18n.t('submit')}</Button>
                    </Grid>
                </LoadingOverlay>
            </Form >
        </CardComponent>
    );
};

export default reduxForm({
    form: 'addServiceProviderForm',
    validate

})(AddServiceProvider);
