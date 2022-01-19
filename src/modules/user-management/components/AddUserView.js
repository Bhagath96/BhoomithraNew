import React, { useEffect } from 'react';
import { change, Field, Form, reduxForm } from 'redux-form';
import { makeStyles, Components, I18n } from '../../../common/components';
import { renderTextField, renderSelect } from '../../../utils/FormUtils';
import { useDispatch, useSelector, connect } from 'react-redux';
import { addUser, edituserBasicDetails } from '../actions';
import { STATE_REDUCER_KEY, GENDER } from '../constants';
import _ from '../../../utils/LodashUtils';
import { useParams } from 'react-router-dom';
import { getUserById, getUserTypes, loadGender } from '../actions';
const { Grid, Button, LoadingOverlay, CardComponent } = Components;
import * as Action from '../../common/actions';
import moment from 'moment';
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

const validate = (values) => {
    const errors = {};

    if (!values.username || values.username.length < 1) {
        errors.username = I18n.t('required', { type: I18n.t('user_name') });
    } else if (!/^[a-z_]*$/.test(values.username)) {
        errors.username = I18n.t('this_username_format_is_not_valid');
    } else if (values.username.length > 23) {
        errors.username = I18n.t('username_length_exceeded', { count: 24 });

    }
    if (!values.firstName) {
        errors.firstName = I18n.t('required', { type: I18n.t('first_name') });
    }
    if (!values.lastName) {
        errors.lastName = I18n.t('required', { type: I18n.t('last_name') });
    }
    if (!values.userTypeResponse) {
        errors.userTypeResponse = I18n.t('required', { type: I18n.t('user_type') });
    }
    if (!values.gender) {
        errors.gender = I18n.t('required', { type: I18n.t('gender') });
    }
    if (!values.dob) {
        errors.dob = I18n.t('required', { type: I18n.t('date_of_birth') });
    } else if (moment().isBefore(values.dob, 'days')) {
        errors.dob = I18n.t('dob_less_current_date');
    } else if (moment().isSame(values.dob, 'days')) {
        errors.dob = I18n.t('dob_same_current_date');
    }
    if (!values.password) {
        errors.password = I18n.t('required', { type: I18n.t('password') });
    } else if (values.password?.length < 6) {
        errors.password = I18n.t('required', { type: I18n.t('character'), count: 6 });
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = I18n.t('passwords_do_not_match');
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = I18n.t('please_enter_new_password');
    }
    return errors;
};
function AddUserView(props) {
    const { id = null } = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
    const { handleSubmit } = props;
    useEffect(() => {
        if (id) {
            dispatch(getUserById(id));
            dispatch(Action.resetFormChange());
        }
    }, [id]);
    useEffect(() => {
        dispatch(getUserTypes());
        dispatch(loadGender());

    }, []);

    const userManagementValues = useSelector(state => state[STATE_REDUCER_KEY]);
    const genderArray = GENDER();
    const { singleUser, getUserType, getGender } = userManagementValues;
    const { data } = getUserType;
    const { singleUserOnly } = singleUser;

    const submit = (values) => {
        if (id) {
            let objectForEdit = {
                username: '',
                firstName: '',
                middleName: '',
                lastName: '',
                userTypeId: 0,
                nonCustomer: true
            };
            objectForEdit.username = values.username;
            objectForEdit.middleName = values.middleName;
            objectForEdit.firstName = values.firstName;
            objectForEdit.lastName = values.lastName;
            objectForEdit.username = values.username;
            objectForEdit.userTypeId = values.userTypeResponse.id;
            objectForEdit.genderId = values.gender.id;
            objectForEdit.dob = values.dob;
            dispatch(edituserBasicDetails(id, objectForEdit));
        } else {
            let objectForPost = {
                password: '',
                username: '',
                firstName: '',
                middleName: '',
                lastName: '',
                userTypeId: 0,
                nonCustomer: true

            };
            objectForPost.password = values.password;
            objectForPost.username = values.username;
            objectForPost.firstName = values.firstName;
            objectForPost.middleName = values.middleName;
            objectForPost.lastName = values.lastName;
            objectForPost.genderId = values.gender.id;
            objectForPost.dob = values.dob;
            objectForPost.userTypeId = values.userTypeResponse.id;
            dispatch(addUser(objectForPost));
        }
        dispatch(Action.resetFormChange());
    };

    return (
        <CardComponent>
            <div>
                <Form onSubmit={handleSubmit(submit)}>
                    <LoadingOverlay active={getUserType.requestInProgress}>
                        <Grid container className={classes.item}>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name='firstName' label={I18n.t('first_name')} component={renderTextField} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name='middleName' label={I18n.t('middle_name')} component={renderTextField} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name='lastName' label={I18n.t('last_name')} component={renderTextField} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name='username' label={I18n.t('user_name')} component={renderTextField} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name='dob' label={I18n.t('date_of_birth')} component={renderTextField} type='date' />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name='gender' label={I18n.t('gender')} component={renderSelect} >
                                    {
                                        _.get(getGender, 'data', genderArray)
                                    }
                                </Field>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name='userTypeResponse' label={I18n.t('user_type')} component={renderSelect} filterable={false} onChange={(value) =>
                                    change('userType', value)}>
                                    {
                                        data?.map(item => ({ id: item.id, name: item.name }))
                                    }
                                </Field>
                            </Grid>
                            {
                                id === null ? (
                                    <Grid container >
                                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                            <Field name='password' label={I18n.t('password')} component={renderTextField} type='password' />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                            <Field name='confirmPassword' label={I18n.t('confirm_password')} component={renderTextField} type='password' />
                                        </Grid>
                                    </Grid>
                                )
                                    : null
                            }
                        </Grid>
                        <Grid item xs={12} className={classes.submit}>
                            <Button type="submit">{_.has(singleUserOnly, 'id') ? I18n.t('update') : I18n.t('submit')}</Button>
                        </Grid>
                    </LoadingOverlay>
                </Form>
            </div>
        </CardComponent>
    );
}

export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].singleUser.singleUserOnly
}))(reduxForm({
    form: 'addUserForm',
    enableReinitialize: true,
    validate
})(AddUserView));

