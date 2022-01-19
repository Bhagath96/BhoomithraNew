import React, { useEffect } from 'react';
import { Field, Form, FormSection, reduxForm } from 'redux-form';
import { Components, makeStyles } from '../../../../common/components';
import { STATE_REDUCER_KEY } from '../../constants';
import _ from '../../../../utils/LodashUtils';
import { useDispatch, useSelector, connect } from 'react-redux';
import * as Actions from '../../actions';
import { useParams } from 'react-router-dom';
import { renderSelect } from '../../../../utils/FormUtils';
import * as Action from '../../../common/actions';
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
const renderCheckBoxes = (list, readOnly) => {
    let data = list.map((item) => {
        return <Grid key={item.id} item xs={4} sm={4} md={4}>
            <Field
                component="input"
                name={item.id}
                type="checkbox"
                disabled={readOnly} />
            <label htmlFor={item.id} >{item.name}</label>
        </Grid>;
    });
    return data;
};
function AssignServiceAdmin(props) {
    const { change } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const { allRolesForOrg, getAssignedServiceAdmin, assignedServiceAdminView: { formData = {} } } = useSelector(state => state[STATE_REDUCER_KEY]);
    const { id, providerId } = useParams();

    useEffect(() => {
        dispatch(Actions.resetServiceAdminForm());
        dispatch(Actions.loadUsersOrganizationListForServiceWorker(id));
        dispatch(Actions.loadAllRoles());
    }, []);

    const [roleId, setRoleId] = React.useState(null);

    const readOnly = hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_ASSIGN_WORKER, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_ASSIGN_WORKER.READ_ONLY);

    const submit = (values) => {
        dispatch(Actions.updateAssignServiceAdmin(values, id, providerId, roleId));
        dispatch(Action.resetFormChange());
    };

    return (
        <div>
            <Grid item xs={12} sm={12} md={12} className={classes.item}>

                <Field spinnerProps="selectTagProp" name='Role' label="Role" component={renderSelect}
                    onChange={(resourceItem) => {
                        dispatch(Actions.getAllUsersUnderRoleId(id, providerId, resourceItem.id));
                        dispatch(Actions.getAssignServiceAdmin(id, providerId, resourceItem.id));
                        setRoleId(resourceItem.id);
                        change('formData', formData);
                        dispatch(Actions.setRoleAndUser({ type: 'Role', data: resourceItem }));
                    }}>
                    {
                        allRolesForOrg.data?.map(item => ({ id: item.pk, name: item.name }))
                    }
                </Field>
            </Grid>

            < Form onSubmit={props.handleSubmit(submit)}>
                <Grid container >
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>
                        <FormSection name="formData">
                            <Grid container >
                                {renderCheckBoxes(_.get(getAssignedServiceAdmin, 'data', []), readOnly)}
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

        </div >
    );
}

export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].assignedServiceAdminView
}))(reduxForm({
    form: 'assignedServiceAdminView',
    enableReinitialize: true
})(AssignServiceAdmin));
