import React, { useEffect } from 'react';
import { Field, Form, FormSection, reduxForm } from 'redux-form';
import { Components, makeStyles } from '../../../../common/components';
import { STATE_REDUCER_KEY } from '../../constants';
import _ from '../../../../utils/LodashUtils';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../actions';
import { useParams } from 'react-router-dom';
import { renderSelect } from '../../../../utils/FormUtils';

import * as Action from '../../../common/actions';
import { getEmptyPicky } from '../../../../utils/CommonUtils';
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
    }
}));

function AssignWorkerLocation(props) {
    const renderCheckBoxes = (list = [], readOnly) => {
        let checkBoxData = list?.map((item) => {
            return (
                <div key={item}>
                    {list ?
                        <Grid key={item.id} item xs={6} sm={6} md={6}>
                            <Field
                                component="input"
                                name={item.id}
                                type="checkbox"
                                disabled={readOnly} />
                            <label htmlFor={item.id} >{item.name}</label>
                        </Grid>
                        : null
                    }

                </div>

            );

        });
        return checkBoxData;
    };

    const { change } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const initialStates = useSelector(state => state[STATE_REDUCER_KEY]);
    const { allRolesForOrg, getAssignedServiceAdminForDropDown, getLocationUnderUserRequest, getLocationUnderUserRequestView: { formData } } = initialStates;
    const { id, providerId } = useParams();
    const [roleId, setRoleId] = React.useState(null);
    const [userId, setUserId] = React.useState(null);
    // useEffect(() => {
    //     change('formData', formData);

    // }, [formData]);

    useEffect(() => {
        dispatch(Actions.resetAssignWorkerLocation());
        dispatch(Actions.loadAllRoles());
    }, []);

    const type = 'dropdown';
    const submit = (values) => {
        dispatch(Actions.updateAssignedWorkerLocation(values, id, providerId, roleId, userId));
        dispatch(Action.resetFormChange());
    };

    const readOnly = hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_ASSIGN_WORKER_LOCATION, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_ASSIGN_WORKER_LOCATION.READ_ONLY);

    return (
        <div>
            <Grid item xs={12} sm={12} md={12} className={classes.item}>

                <Field spinnerProps="selectTagProp" name='Role' label="Role" component={renderSelect}
                    onChange={(resourceItem) => {
                        change('roleId', resourceItem.id);
                        change('User', {});
                        dispatch(Actions.getAssignServiceAdminDropDown(type, id, providerId, resourceItem.id));
                        dispatch(Actions.resetCheckboxWorkerArray());
                        setRoleId(resourceItem.id);
                        dispatch(Actions.setRoleAndUser({ type: 'Role', data: resourceItem }));
                        dispatch(Actions.setRoleAndUser({ type: 'User', data: getEmptyPicky() }));
                    }}>
                    {
                        allRolesForOrg.data?.map(item => ({ id: item.pk, name: item.name }))
                    }
                </Field>
            </Grid>
            <Grid item xs={12} sm={12} md={12} className={classes.item}>

                <Field spinnerProps="selectTagProp" name='User' label="User" component={renderSelect}
                    onChange={(resourceItem) => {
                        change('userId', resourceItem.id);
                        dispatch(Actions.getAllLocationUnderUser(id, providerId, resourceItem.id, roleId));
                        setUserId(resourceItem.id);
                        dispatch(Actions.setRoleAndUser({ type: 'User', data: resourceItem }));
                    }}>
                    {
                        getAssignedServiceAdminForDropDown.data?.map(item => ({ id: item.id, name: item.name }))
                    }
                </Field>
            </Grid>

            <Form onSubmit={props.handleSubmit(submit)}>
                <Grid container >


                    <Grid item xs={12} sm={12} md={12} className={classes.item}>
                        <FormSection name="formData">
                            <Grid container >
                                {renderCheckBoxes(_.get(getLocationUnderUserRequest, 'data', formData), readOnly)}
                            </Grid>
                        </FormSection>
                    </Grid>
                    {!readOnly &&
                        <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                            <Button type="submit">{'Submit'}</Button>
                        </Grid>
                    }
                </Grid>
            </Form>

        </div>
    );
}
export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].getLocationUnderUserRequestView
}))(reduxForm({
    form: 'AssignWorkerLocationForm',
    enableReinitialize: true
})(AssignWorkerLocation));

