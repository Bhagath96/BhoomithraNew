import React, { useEffect } from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { Components, makeStyles } from '../../../../common/components';
import { STATE_REDUCER_KEY } from '../../constants';
import { useDispatch, useSelector, connect } from 'react-redux';
import * as Actions from '../../actions';
import { useParams } from 'react-router-dom';
import { renderSimpleSelect } from '../../../../utils/FormUtils';


const { Grid } = Components;

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
function AssignSuperVisor(props) {
    const { change } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const initialStates = useSelector(state => state[STATE_REDUCER_KEY]);
    const { allRolesForOrg, usersByRoleId } = initialStates;

    const { id } = useParams();
    props.change('organizationId', id);

    useEffect(() => {
        dispatch(Actions.getAssignSuperVisor(id));
        dispatch(Actions.loadUsersOrganizationList(id));
        dispatch(Actions.loadAllRoles());
    }, []);

    const submit = (values) => {
        dispatch(Actions.updateAssignServiceAdmin(values));
    };
    return (
        <div>
            <Form onSubmit={props.handleSubmit(submit)}>
                <Grid item xs={12} sm={12} md={12} className={classes.item}>

                    <Field spinnerProps="selectTagProp" name='Role' label="Resource" component={renderSimpleSelect}
                        onChange={(resourceItem) => {
                            change('resourceId', resourceItem.target.value);
                            dispatch(Actions.fetchUserBasedOnRoleId(resourceItem.target.value, id));
                        }}>
                        {
                            allRolesForOrg.data?.map(item => ({ id: item.id, name: item.label }))
                        }
                    </Field>
                </Grid>
                <Grid item xs={12} sm={12} md={12} className={classes.item}>

                    <Field spinnerProps="selectTagProp" name='admin' label="Admin" component={renderSimpleSelect}
                        onChange={(resourceItem) => {
                            change('resourceId', resourceItem.target.value);
                            dispatch(Actions.fetchUserBasedOnRoleId(resourceItem.target.value, id));
                        }}>
                        {
                            usersByRoleId.data?.map(item => ({ id: item.id, name: item.label }))
                        }
                    </Field>
                </Grid>
            </Form>
        </div>
    );
}

// export default AssignServiceAdmin;
export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].getAssignedServiceAdmin.data
}))(reduxForm({
    form: 'AssignSuperVisorForm',
    enableReinitialize: true
})(AssignSuperVisor));
