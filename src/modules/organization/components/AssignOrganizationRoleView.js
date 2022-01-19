import React, { useEffect } from 'react';
import { Field, Form, FormSection, reduxForm } from 'redux-form';
import { useDispatch, useSelector, connect } from 'react-redux';
import { renderSelect } from '../../../utils/FormUtils';
import { Components, makeStyles, I18n } from '../../../common/components';
import { STATE_REDUCER_KEY } from '../constants';
import _ from '../../../utils/LodashUtils';
import * as Actions from '../actions';
import { useParams, useHistory } from 'react-router-dom';
import * as Action from '../../common/actions';
import LoadingOverlay from 'react-loading-overlay';
import { RESPONSE_TYPE } from '../../../common/constants';
import { organizationTypeChecking } from '../../../utils/ApiUtils';

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

const renderCheckBoxes = (list) => {
    let data = list.map((item) => {
        return <Grid key={item.id} item xs={4} sm={4} md={4}>
            <Field
                component="input"
                name={item.id}
                type="checkbox" />
            <label htmlFor={item.id} >{item.name}</label>
        </Grid>;
    });

    return data;
};
export const AssignOrganizationRoleView = (props) => {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [selectedValue, setSelectedValue] = React.useState(null);

    const UserGroupAssignUsers = useSelector(state => _.get(state, STATE_REDUCER_KEY, {}));
    const { loadUserGroupAssignUsers, organizationRoleTypes } = UserGroupAssignUsers;
    useEffect(() => {
        let organizationType = organizationTypeChecking(id);
        if (organizationType) {
            dispatch(Actions.resetOrgFormRole());
            dispatch(Actions.loadOrganizationRoleTypes(RESPONSE_TYPE.DROP_DOWN));
        } else {
            history.push(`/admin/index/organization/${id}/basic`);
            window.location.reload();
        }
    }, []);
    // useEffect(() => {
    //     change('formData', formData);
    // }, [formData]);
    const submit = (values) => {
        dispatch(Actions.updateUserOrganizationRole({ ...values, roleId: selectedValue }, id, selectedValue));
        dispatch(Action.resetFormChange());
    };
    return (
        <div>
            <LoadingOverlay active={loadUserGroupAssignUsers.requestInProgress}>
                <Grid item xs={12} sm={12} md={12} className={classes.item}>

                    <Field spinnerProps="selectTagProp" name='Role' label={I18n.t('roles')} component={renderSelect}
                        onChange={(resourceItem) => {
                            dispatch(Actions.loadUserGroupAssignUsersList(resourceItem.id, id));
                            setSelectedValue(resourceItem.id);
                            dispatch(Actions.setRoleAndUser({ type: 'Role', data: resourceItem }));
                        }}>
                        {
                            organizationRoleTypes.dropdown?.map(item => ({ id: item.id, name: item.name }))
                        }
                    </Field>
                </Grid>
                <Form onSubmit={props.handleSubmit(submit)}>
                    <Grid container >
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <FormSection name="formData">
                                <Grid container >
                                    {renderCheckBoxes(_.get(loadUserGroupAssignUsers, 'data', []))}
                                </Grid>
                            </FormSection>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                            <Button type="submit">{I18n.t('submit')}</Button>
                        </Grid>
                    </Grid>
                </Form>
            </LoadingOverlay>
        </div>
    );
};


export default connect((state) => ({
    initialValues: state[STATE_REDUCER_KEY].assignOrgRoleView
}))(reduxForm({
    form: 'AssignOrganizationRoleForm',
    enableReinitialize: true
})(AssignOrganizationRoleView));

