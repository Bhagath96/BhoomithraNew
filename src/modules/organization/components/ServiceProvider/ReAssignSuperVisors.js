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

function ReAssgnSuperVisors(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { wardsByProviderId = {}, swSuperVisorForWard = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
    const [currentWard, setCurrentWard] = React.useState({});
    const [newSuperVisorData, setNewSuperVisorDate] = React.useState([]);
    const [newSuperVisorId, setNewSuperVisorId] = React.useState();

    const [oldSuperVisorId, setOldSuperVisorId] = React.useState();


    const { id, providerId } = useParams();
    useEffect(() => {
        dispatch(Actions.getWardsUnderProviderId(id, providerId));
    }, [providerId]);
    const removeSelectedItemFromOldServiceWorker = (resourceItem) => {
        dispatch(Actions.getSwSuperVisorForWard({ wardId: currentWard?.id, orgId: id, providerId: providerId }));
        let data = swSuperVisorForWard?.data?.filter((item) => {
            return item !== resourceItem;
        });
        setNewSuperVisorDate(data);
    };
    const submit = () => {

        dispatch(Actions.submitReAssignSuperVisorData({ organizationid: id, providerId: providerId, wardId: currentWard?.id, oldSuperVisorId: oldSuperVisorId?.id, newSupervisorId: newSuperVisorId?.id }));


    };

    const readOnly = hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_REASSIGN_SUPERVISOR, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_REASSIGN_SUPERVISOR.READ_ONLY);
    return (
        <div>
            <Form onSubmit={props.handleSubmit(submit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} spacing={2} className={classes.item}>

                        <Field spinnerProps="selectTagProp" name='wards' label={I18n.t('ward')} disabled={readOnly} component={renderSelect}
                            onChange={(resourceItem) => {
                                props.change('swSuperVisor', null);
                                props.change('newSwSuperVisor', null);
                                props.change('oldswSuperVisor', null);


                                setCurrentWard(resourceItem);
                                dispatch(Actions.getSwSuperVisorForWard({ wardId: resourceItem.id, orgId: id, providerId: providerId }));
                            }}>
                            {
                                _.get(wardsByProviderId, 'data', [])

                            }
                        </Field>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>

                        <Field name='oldswSuperVisor' label={I18n.t('old_superVisor')} disabled={readOnly} component={renderSelect}
                            onChange={(resourceItem) => {
                                props.change('newswSuperVisor', null);
                                setOldSuperVisorId(resourceItem);
                                removeSelectedItemFromOldServiceWorker(resourceItem);
                            }}>
                            {
                                swSuperVisorForWard?.data || []
                            }
                        </Field>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>

                        <Field name='newswSuperVisor' label={I18n.t('new_superVisor')} disabled={readOnly} component={renderSelect}
                            onChange={(resourceItem) => {
                                setNewSuperVisorId(resourceItem);


                                // dispatch(Actions.getServiceWorkerFromSWSuperVisor({ swSuperVisorId: resourceItem.id, wardId: currentWard?.id, orgId: id, providerId: providerId }));
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
        // initialValues: state[STATE_REDUCER_KEY].reAssignGT
    }))(reduxForm({
        form: 'ReAssgnSuperVisors',
        enableReinitialize: true
        // validate
    })(ReAssgnSuperVisors));
