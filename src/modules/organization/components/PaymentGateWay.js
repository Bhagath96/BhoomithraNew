import React, { useEffect } from 'react';
import { Form, Field, FormSection, reduxForm } from 'redux-form';
import { renderTextField, renderSimpleSelect } from '../../../utils/FormUtils';
import { useDispatch, connect, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { API_TYPES } from '../constants';
import { getPaymentApiProvider } from '../actions';
import { Components, makeStyles, I18n } from '../../../common/components';
import { STATE_REDUCER_KEY } from '../constants';
import { resetFormChange } from '../../common/actions';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';
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
function PaymentGateWay(props) {
    const classes = useStyles();
    const { id = 0 } = useParams();
    const dispatch = useDispatch();
    const { change, handleSubmit } = props;
    const apiProvider = useSelector(state => state[STATE_REDUCER_KEY].apiProviders.data.PaymentGateWay);

    useEffect(() => {
        dispatch(getPaymentApiProvider(id, API_TYPES.PAYMENT));

    }, []);
    const submit = () => {
        dispatch(resetFormChange());

    };
    const readOnlyPermission = hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_API_PROVIDER_PAYMENT_GATEWAY, ACTION_MAPPING.ORGANIZATION_API_PROVIDER_PAYMENT_GATEWAY.READ_ONLY);

    return (
        <div>
            <Form onSubmit={handleSubmit(submit)}>
                <FormSection name="formData">
                    <Grid container>

                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field disabled={readOnlyPermission} name="apiProvider" label={I18n.t('provider')} component={renderSimpleSelect} onChange={(provider) => {
                                let value = { id: provider.target.value };
                                change('apiProvider', value);
                            }
                            }>
                                {
                                    apiProvider || []
                                }
                            </Field>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field disabled={readOnlyPermission} name="key" label={I18n.t('key')} component={renderTextField} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field disabled={readOnlyPermission} name="clientId" label={I18n.t('client_id')} component={renderTextField} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field disabled={readOnlyPermission} name="clientSecret" label={I18n.t('client_secret')} component={renderTextField} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field disabled={readOnlyPermission} name="endPoint" label={I18n.t('end_point')} component={renderTextField} />
                        </Grid>
                    </Grid>
                </FormSection>
                <Grid item xs={12} className={classes.submit}>
                    <Button type="submit" >{I18n.t('submit')}</Button>
                </Grid>
            </Form>
        </div>
    );
}

export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].notificationApiProvider
}))(reduxForm({
    form: 'PaymentGateWayApiProviderForm',
    enableReinitialize: true
})(PaymentGateWay));

