
import React, { useEffect } from 'react';
import { Field, Form, reduxForm, FormSection } from 'redux-form';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Components, I18n, makeStyles } from '../../../common/components';
import { STATE_REDUCER_KEY } from '../constants';
import { useParams } from 'react-router-dom';
import _ from '../../../utils/LodashUtils';
import { renderSelect } from '../../../utils/FormUtils';
import * as Actions from '../actions';
import LoadingOverlay from '../../../common/components/custom/LoadingOverlay.js';
import * as Action from '../../common/actions';
import { Typography } from '@material-ui/core';
const { Grid, Button } = Components;

const useStyles = makeStyles((theme) => ({
    item: {
        padding: theme.spacing(1)
    },
    submit: {
        textAlign: 'center'
    },
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}));

function EditRolePermission(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Actions.listPermissionControllers());
    }, []);

    const { change, handleSubmit } = props;
    const classes = useStyles();
    const { id } = useParams();

    const roleDetails = useSelector(state => state[STATE_REDUCER_KEY]);
    const { controllerPermissions: { data: resources } = {}, resourceActionsList, requestInProgress, updateRolePermission } = roleDetails;
    const { data } = resourceActionsList;
    let { parents = [], child: childList = {} } = data;

    const { resource: { id: resourceId = 0, resourceActions: childResourceActions = [] } = {} } = childList;


    const renderCheckBoxes = (list) => {
        let checkBoxData = list.map((item) => {
            return <Grid key={item.id} item xs={4} sm={4} md={4}>
                <Field
                    component="input"
                    name={item.bitwiseValue}
                    type="checkbox" />
                <span>{item.label}</span>
            </Grid>;
        });
        return checkBoxData;
    };

    const submit = (values) => {
        const { resourceId: childResource, child, parent } = values;

        let childResourceId = _.get(childResource, 'id', 0);
        let actionIds = 0;
        let childObject = _.get(child, `${childResourceId}`, {});
        for (const action in childObject) {
            if (childObject[action]) {
                actionIds = actionIds + Number(action);
            }

        }

        let parentKey = Object.entries(parent);
        let parentResources = parentKey.map(item => {
            let parentActionId = [];
            _.forEach(item[1], function (action, key) {
                if (action === true) {
                    parentActionId.push(parseInt(key));
                }
            });
            return { resourceId: Number(item[0]), actionIds: _.sum(parentActionId) };
        });

        let objToSend = {
            roleId: Number(id),
            resource: {
                resourceId: childResourceId,
                actionIds: actionIds
            },
            parentResources
        };
        dispatch(Actions.saveResourceActions(objToSend));
        dispatch(Action.resetFormChange());
    };

    return (
        <div>
            <Form onSubmit={handleSubmit(submit)}>
                <Grid item xs={12} sm={12} md={12} className={classes.item}>
                    <Field showLoader={requestInProgress} spinnerProps="selectTagProp" name='resourceId' label={I18n.t('resources')} component={renderSelect}
                        onChange={(resourceItem) => {
                            change('resourceId', resourceItem.id);
                            dispatch(Actions.fetchResourceActions({ resourceId: resourceItem.id, roleId: id }));
                            dispatch(Actions.setData({ type: 'resourceId', data: resourceItem }));
                        }}>
                        {
                            resources.map(item => ({ id: item.id, name: item.label }))
                        }
                    </Field>
                </Grid>
                <LoadingOverlay active={updateRolePermission.requestInProgress}>
                    <FormSection name="child">

                        <FormSection name={resourceId} key={resourceId}>
                            <Grid item xs={12}>
                                <Grid container>
                                    {renderCheckBoxes(childResourceActions)}
                                </Grid>
                            </Grid>
                        </FormSection>

                    </FormSection>
                    {parents.length > 0 ?

                        <FormSection name="parent">
                            <div style={{ border: '2px solid LightGray', borderRadius: '10px', padding: '10px', marginTop: '20px' }}>
                                <Typography variant='h3'>Parent</Typography>
                                {parents?.map(parentItem => {
                                    const { resource: { id: parentResourceId = 0, label = '', resourceActions = [] } = {} } = parentItem;
                                    return (
                                        <FormSection name={parentResourceId} key={parentResourceId}>
                                            <Grid item xs={12}>
                                                <p>{label}</p>
                                                <Grid container>
                                                    {renderCheckBoxes(resourceActions)}
                                                </Grid>
                                            </Grid>
                                        </FormSection>
                                    );
                                })}
                            </div>
                        </FormSection>

                        : ''}
                    <Grid item xs={12} className={classes.submit}>
                        <Button type="submit">{I18n.t('submit')}</Button>
                    </Grid>
                </LoadingOverlay>
            </Form>
        </div>
    );
}

export default
    connect(state => ({
        initialValues: state[STATE_REDUCER_KEY].resourceActions
    }))(reduxForm({
        form: 'EditRolePermission',
        enableReinitialize: true
    })(EditRolePermission));
