import React, { useEffect } from 'react';
import { Field, Form, FormSection, reduxForm } from 'redux-form';
import { Components, makeStyles } from '../../../../common/components';
import { STATE_REDUCER_KEY } from '../../constants';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../actions';
import { useParams } from 'react-router-dom';
import { renderSelect } from '../../../../utils/FormUtils';
import _ from 'lodash';
import { hasAccessPermission } from '../../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../../common/Permissions';
const { Grid, Button, LoadingOverlay } = Components;
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

const renderCheckBoxes = (list = [], readOnly) => {
    let checkBoxData = list?.map((item) => {
        return <Grid key={item.id} item xs={4} sm={4} md={4}>
            <Field
                component="input"
                name={item.id}
                type="checkbox"
                disabled={readOnly} />
            <label htmlFor={item.id} >{item.name}</label>
        </Grid>;
    });
    return checkBoxData;
};
function AssignSuperVisorToWorker(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {
        allRolesForOrg: { data: allRoles = [], requestInProgress: allRolesRequestInProgress = false },
        getAssignedServiceAdminForDropDown: { data: supervisors = [], requestInProgress: supervisorRequestInProgress = false },
        getAllUserUnderorganization: { data: workers = [], requestInProgress: workersRequestInProgress = false } } = useSelector(state => state[STATE_REDUCER_KEY]);
    const { id, providerId } = useParams();
    const [roleId, setRoleId] = React.useState(null);
    const [userId, setUserId] = React.useState(null);
    const type = 'dropdown';
    useEffect(() => {
        dispatch(Actions.resetSuperVisorToWorker());
        dispatch(Actions.resetCheckBoxSupervisorToWorker());
        dispatch(Actions.loadAllRoles());
    }, []);
    const submit = (values) => {
        dispatch(Actions.updateAllUserUnderOrg(_.get(values, 'formData', {}), id, providerId, roleId, userId));
    };

    const readOnly = hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_ASSIGN_WORKER_TO_SUPERVISOR, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_ASSIGN_WORKER_TO_SUPERVISOR.READ_ONLY);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} className={classes.item}>
                    <Field showLoader={allRolesRequestInProgress} name='role' label="Role" component={renderSelect}
                        onChange={(resourceItem) => {
                            dispatch(Actions.resetCheckBoxSupervisorToWorker());
                            setRoleId(resourceItem.id);
                            dispatch(Actions.setWorkerAndSuperwiser({ role: resourceItem, user: null, formData: {} }));
                            dispatch(Actions.getAssignServiceAdminDropDown(type, id, providerId, resourceItem.id));
                        }}>
                        {
                            allRoles.map(item => ({ id: item.pk, name: item.name }))
                        }
                    </Field>
                </Grid>
                <Grid item xs={12} sm={12} md={12} className={classes.item}>
                    <Field showLoader={supervisorRequestInProgress} name='user' label="Supervisor" component={renderSelect}
                        onChange={(resourceItem) => {
                            dispatch(Actions.resetCheckBoxSupervisorToWorker());
                            dispatch(Actions.setWorkerAndSuperwiser({ user: resourceItem, formData: {} }));
                            setUserId(resourceItem.id);
                            dispatch(Actions.getAllUserUnderOrgSp(id, providerId, resourceItem.id, roleId));
                        }}>
                        {supervisors}
                    </Field>
                </Grid>
            </Grid>
            <LoadingOverlay active={workersRequestInProgress}>

                <Form onSubmit={props.handleSubmit(submit)}>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>
                        <FormSection name="formData">
                            <Grid container >
                                {renderCheckBoxes(workers, readOnly)}
                            </Grid>
                        </FormSection>
                    </Grid>
                    {!readOnly &&
                        <Grid item xs={12} className={classes.submit}>
                            <Button type="submit">{'Submit'}</Button>
                        </Grid>
                    }
                </Form>

            </LoadingOverlay>
        </ >
    );
}

export default connect((state) => ({
    initialValues: state[STATE_REDUCER_KEY].assignSuperVisorToWorkerForm
}))(reduxForm({
    form: 'AssignSuperVisorToWorkerForm',
    enableReinitialize: true
})(AssignSuperVisorToWorker));
