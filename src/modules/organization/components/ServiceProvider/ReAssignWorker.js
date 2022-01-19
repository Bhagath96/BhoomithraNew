import React, { useEffect } from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { Components, makeStyles, I18n } from '../../../../common/components';
import { STATE_REDUCER_KEY } from '../../constants';
import { useDispatch, useSelector, connect } from 'react-redux';
import * as Actions from '../../actions';
import { useParams } from 'react-router-dom';
import { renderSelect } from '../../../../utils/FormUtils';
import _ from 'lodash';
import { hasAccessPermission } from '../../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../../common/Permissions';
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
    },
    divIsDisabled: {
        pointerEvents: 'none',
        opacity: ' 0.7'
    }
}));
function ReAssignWorker(props) {
    const { wardsByProviderId = {}, swSuperVisorForWard = {}, serviceWorkerFromSwSuperVisor = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
    const [currentWard, setCurrentWard] = React.useState({});
    const [currentSwSuperVisor, setcurrentSwSuperVisor] = React.useState({});

    const classes = useStyles();
    const dispatch = useDispatch();
    const [newSuperVisorData, setNewSuperVisorDate] = React.useState([]);
    const [oldServiceWorkerId, setOldServiceWorker] = React.useState();
    const [newServiceWorkerId, setnewServiceWorkerId] = React.useState();

    const { id, providerId } = useParams();
    useEffect(() => {
        dispatch(Actions.getWardsUnderProviderId(id, providerId));
    }, [providerId]);
    const removeSelectedItemFromOldServiceWorker = (resourceItem) => {
        dispatch(Actions.getServiceWorkerFromSWSuperVisor({ swSuperVisorId: currentSwSuperVisor?.id, wardId: currentWard?.id, orgId: id, providerId: providerId, superVisorId: currentSwSuperVisor?.id }));
        let data = serviceWorkerFromSwSuperVisor?.data?.filter((item) => {
            return item !== resourceItem;
        });
        setNewSuperVisorDate(data);
    };

    const submit = () => {

        dispatch(Actions.submitReAssignWorkerData({ organizationid: id, providerId: providerId, wardId: currentWard?.id, oldServiceWorkerId: oldServiceWorkerId?.id, newServiceWorkerId: newServiceWorkerId?.id, superVisorId: currentSwSuperVisor?.id }));

    };
    const readOnly = hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_REASSIGN_WORKER, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_REASSIGN_WORKER.READ_ONLY);
    return (
        <div>
            <Form onSubmit={props.handleSubmit(submit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} spacing={2} className={classes.item}>

                        <Field spinnerProps="selectTagProp" name='wards' label={I18n.t('ward')} disabled={readOnly} component={renderSelect}
                            onChange={(resourceItem) => {
                                props.change('swSuperVisor', null);
                                props.change('newServiceWorker', null);
                                props.change('oldServiceWorker', null);

                                setCurrentWard(resourceItem);
                                dispatch(Actions.getSwSuperVisorForWard({ wardId: resourceItem.id, orgId: id, providerId: providerId }));
                            }}>
                            {
                                _.get(wardsByProviderId, 'data', [])

                            }
                        </Field>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>

                        <Field name='swSuperVisor' label={I18n.t('sw_superVisor')} disabled={readOnly} component={renderSelect}
                            onChange={(resourceItem) => {
                                setcurrentSwSuperVisor(resourceItem);
                                dispatch(Actions.getServiceWorkerFromSWSuperVisor({ swSuperVisorId: resourceItem.id, wardId: currentWard?.id, orgId: id, providerId: providerId }));
                            }}>
                            {
                                swSuperVisorForWard?.data || []
                            }
                        </Field>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>

                        <Field name='oldServiceWorker' label={I18n.t('old_service_worker')} disabled={readOnly} component={renderSelect}
                            onChange={(resourceItem) => {
                                props.change('newServiceWorker', null);
                                setOldServiceWorker(resourceItem);
                                removeSelectedItemFromOldServiceWorker(resourceItem);
                            }}>
                            {
                                serviceWorkerFromSwSuperVisor?.data || []
                            }
                        </Field>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>

                        <Field name='newServiceWorker' label={I18n.t('new_service_worker')} disabled={readOnly} component={renderSelect}
                            onChange={(resourceItem) => {
                                setnewServiceWorkerId(resourceItem);

                            }}>
                            {
                                newSuperVisorData || []
                            }
                        </Field>
                    </Grid>
                </Grid>
                {!readOnly &&
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <Button type="submit" >{I18n.t('submit')}</Button>
                    </Grid>
                }

            </Form>
        </div>
    );
}


export default
    connect(() => ({
    }))(reduxForm({
        form: 'ReAssignWorker'
        // validate
    })(ReAssignWorker));

