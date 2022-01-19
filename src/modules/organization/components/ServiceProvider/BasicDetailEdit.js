import React, { useEffect } from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { renderTextField, renderSimpleSelect } from '../../../../utils/FormUtils';
import { Components, makeStyles } from '../../../../common/components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, connect } from 'react-redux';
import * as Actions from '../../actions';
import LoadingOverlay from '../../../../common/components/custom/LoadingOverlay.js';
import { STATE_REDUCER_KEY } from '../../constants';
import * as Action from '../../../common/actions';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../../common/Permissions';
import { readOnlyPermissionCheck } from '../../../../utils/PermissionUtils';
const { Grid, Button } = Components;

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

function BasicDetailEdit(props) {
    const readOnylFlag = readOnlyPermissionCheck(ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_DETAILS.READ_ONLY, RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_DETAILS);
    const dispatch = useDispatch();
    const classes = useStyles();
    const { id, providerId } = useParams();

    const { change, handleSubmit } = props;
    const initialValues = useSelector(state => state[STATE_REDUCER_KEY]);
    const { serviceProvider, templateTypes } = initialValues;
    useEffect(() => {
        dispatch(Actions.getServiceProvider());
        dispatch(Actions.getTemplateTypes());
        dispatch(Actions.getServiceProviderById(providerId, id));

    }, []);


    const submit = (values) => {
        let templateTypeId = values.templateType.id;
        let serviceProviderTypeId = values.serviceProviderType.id;

        const { name } = values;
        dispatch(Actions.editServiceProviders({ templateTypeId, name, serviceProviderTypeId }, id, providerId));
        dispatch(Action.resetFormChange());

    };


    return (
        <Form onSubmit={handleSubmit(submit)}>
            <LoadingOverlay active={false}>
                {/* < FormSection name="serviceProvider"> */}
                <Grid container className={classes.item}>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>
                        <Field name="name" label="Name" disabled={readOnylFlag} component={renderTextField} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>
                        <Field name="serviceProviderType" label="Service provider type" component={renderSimpleSelect} disabled={true} onChange={(value) =>
                            change('serviceProviderTypeId', value.target.value)} >
                            {
                                serviceProvider.data?.map(item => ({ id: item.pk, name: item.name }))
                            }
                        </Field>
                        <Field name="templateType" label="Template type" component={renderSimpleSelect} disabled={true} onChange={(value) => {
                            change('templateTypeId', value.target.value);
                        }}
                        >
                            {
                                templateTypes.data?.map(item => ({ id: item.id, name: item.name }))
                            }
                        </Field>
                    </Grid>
                </Grid>
                {/* </FormSection> */}
                {
                    !readOnylFlag &&
                    <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                        <Button type="submit">{'Submit'}</Button>
                    </Grid>
                }
            </LoadingOverlay>
        </Form >
    );
}


// export default reduxForm({
//     form: 'editServiceProviderForm',
//     validate

// })(BasicDetailEdit);
export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].serviceProviderById.data
}))(reduxForm({
    form: 'BasicDetailEditForm',
    enableReinitialize: true
})(BasicDetailEdit));

