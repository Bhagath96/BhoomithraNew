
import React, { useEffect } from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { renderTextField, renderTextAreaField, renderSimpleSelect } from '../../../utils/FormUtils';
import { makeStyles, Components, I18n } from '../../../common/components';
import _ from '../../../utils/LodashUtils';
import { useDispatch, useSelector, connect } from 'react-redux';
import { STATE_REDUCER_KEY } from '../constants';
import { updateRole, setRole, getUsersBasedOnRoleId } from '../actions';
import LoadingOverlay from '../../../common/components/custom/LoadingOverlay.js';
import * as Action from '../../common/actions';

import { useParams } from 'react-router-dom';
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
const { Grid, Button } = Components;

const validate = (values) => {
    const errors = {};
    if (!values.roleType) {
        errors.roleType = I18n.t('required', { type: I18n.t('role_type') });
    }
    if (!values.title) {
        errors.title = I18n.t('required', { type: I18n.t('title') });
    }
    if (!values.description) {
        errors.description = I18n.t('required', { type: I18n.t('description') });
    }
    return errors;
};

function EditRoleView(props) {
    const { id } = useParams();
    const { change, handleSubmit } = props;
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(getUsersBasedOnRoleId(id));
        dispatch(setRole(id));
    }, []);
    //to get roleType
    const roleType = useSelector(state => state[STATE_REDUCER_KEY].roleType);
    //to get the single record
    const initialValue = useSelector(state => state[STATE_REDUCER_KEY]);
    const { getroleById } = initialValue;

    const submit = (values) => {
        let data = {
            name: '',
            title: '',
            description: '',
            roleTypeId: '',
            key: ''
        };
        data.name = values.name;
        data.title = values.title;
        data.description = values.description;
        data.roleTypeId = values.roleType.id;
        data.key = values.key;
        dispatch(updateRole(id, data));
        dispatch(Action.resetFormChange());
    };

    return (
        <div>
            <Form onSubmit={handleSubmit(submit)} >
                <LoadingOverlay active={getroleById.requestInProgress}>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>
                        <Field name='name' label={I18n.t('names')} type='text' component={renderTextField} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>
                        <Field name="roleType" label={I18n.t('role_type')} disabled={true} component={renderSimpleSelect} onChange={(value) =>
                            change('roleType', value)}>
                            {
                                _.get(roleType, 'data', [])
                            }
                        </Field>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>
                        <Field name='title' label={I18n.t('title')} type='text' component={renderTextField} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>
                        <Field name='description' label={I18n.t('description')} type='text' placeholder={I18n.t('description')} component={renderTextAreaField} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>
                        <Field name='key' label={I18n.t('key')} type='text' placeholder='Key' component={renderTextField} disabled={true} />
                    </Grid>
                    <Grid item xs={12} className={classes.submit}>
                        <Button type="submit">{I18n.t('update')}</Button>
                    </Grid>
                </LoadingOverlay>
            </Form>
        </div>
    );
}

export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].getroleById.data
}))(reduxForm({
    form: 'EditRoleForm',
    enableReinitialize: true,
    validate
})(EditRoleView));
