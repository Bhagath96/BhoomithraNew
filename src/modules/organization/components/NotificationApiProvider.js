import React, { useEffect } from 'react';
import { Form, Field, FormSection, reduxForm } from 'redux-form';
import { renderTextField, renderSimpleSelect } from '../../../utils/FormUtils';
import { useDispatch, useSelector, connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { API_TYPES } from '../constants';
import { getNotificationApiProvider, sentApiProviderKey, sentApiProviderKeyForPost } from '../actions';
import { Components, makeStyles, I18n } from '../../../common/components';
const { Grid, Button } = Components;
import { STATE_REDUCER_KEY } from '../constants';
import { resetFormChange } from '../../common/actions';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';

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

function NotificationApiProvider(props) {
    const classes = useStyles();
    const { id = 0 } = useParams();
    const dispatch = useDispatch();
    const { change, handleSubmit } = props;
    const apiProvider = useSelector(state => state[STATE_REDUCER_KEY].apiProviders.data.Notification);
    const apikeyProviderId = useSelector(state => state[STATE_REDUCER_KEY].notificationApiProvider.formData.id);

    useEffect(() => {
        dispatch(getNotificationApiProvider(id, API_TYPES.NOTIFICATION));

    }, []);
    const submit = (values) => {
        if (apikeyProviderId) {
            let sendingObject = {
                apiProviderId: 0,
                key: '',
                clientId: '',
                clientSecret: '',
                endPoint: ''
            };
            sendingObject.apiProviderId = values.formData.apiProvider.id;
            sendingObject.key = values.formData.key;
            sendingObject.clientId = values.formData.clientId;
            sendingObject.clientSecret = values.formData.clientSecret;
            sendingObject.endPoint = values.formData.endPoint;
            sendingObject.id = values.formData.id;
            dispatch(sentApiProviderKey(id, sendingObject));
        } else {
            let sendingObject = {
                apiProviderId: 0,
                key: '',
                clientId: '',
                clientSecret: '',
                endPoint: ''
            };
            sendingObject.apiProviderId = values.formData.apiProvider;
            sendingObject.key = values.formData.key;
            sendingObject.clientId = values.formData.clientId;
            sendingObject.clientSecret = values.formData.clientSecret;
            sendingObject.endPoint = values.formData.endPoint;
            dispatch(sentApiProviderKeyForPost(id, sendingObject));

        }
        dispatch(resetFormChange());

    };
    const readOnlyPermission = hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_API_PROVIDER_NOTIFICATION, ACTION_MAPPING.ORGANIZATION_API_PROVIDER_NOTIFICATION.READ_ONLY);

    return (
        <div>
            <Form onSubmit={handleSubmit(submit)}>
                <FormSection name="formData">
                    <Grid container>

                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field disabled={readOnlyPermission} name="apiProvider" label={I18n.t('provider')} component={renderSimpleSelect} onChange={(provider) => {
                                let value = { id: provider.target.value };
                                change('formData.apiProvider', value);
                            }
                            }>
                                {
                                    apiProvider
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

// export default NotificationApiProvider;

export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].notificationApiProvider
}))(reduxForm({
    form: 'NotificationApiProviderForm',
    enableReinitialize: true
})(NotificationApiProvider));

