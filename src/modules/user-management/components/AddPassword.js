import React from 'react';
import { changePassword } from '../actions';
import { Field, Form, reduxForm } from 'redux-form';
import { makeStyles, Components, I18n } from '../../../common/components';
import { asyncValidate, renderTextField } from '../../../utils/FormUtils';
import { useDispatch, useSelector, connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { STATE_REDUCER_KEY } from '../constants';
import LoadingOverlay from '../../../common/components/custom/LoadingOverlay.js';
import * as Yup from 'yup';
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


const schema = Yup.object().shape({
    password: Yup.string().min(6, I18n.t('password_should_be_atleast_8_chars'))
        .max(20, I18n.t('length_error', { type: I18n.t('20') }))
        .required(I18n.t('required', { type: I18n.t('password') })),
    confirmPassword: Yup.string().required(I18n.t('required', { type: I18n.t('password') })).oneOf([Yup.ref('password'), null], I18n.t('passwords_do_not_match'))
});

function AddPassword(props) {
    const userPasswordValues = useSelector(state => state[STATE_REDUCER_KEY]);
    const { editUserPassword } = userPasswordValues;
    const dispatch = useDispatch();
    const classes = useStyles();
    const { handleSubmit } = props;
    const { id } = useParams();
    const submit = (values) => {
        values.userId = id;
        dispatch(changePassword(values));
    };
    return (
        <div>
            <Form onSubmit={handleSubmit(submit)} autoComplete='off'>
                <LoadingOverlay active={editUserPassword.requestInProgress}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field name='password' label={I18n.t('password')} type='password' component={renderTextField} on />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field name='confirmPassword' label={I18n.t('confirm_password')} type='password' component={renderTextField} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.submit}>
                        <Button type="submit">{I18n.t('submit')} </Button>
                    </Grid>
                </LoadingOverlay>
            </Form>
        </div>
    );
}
export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].getUserContactDetail.data
}))(reduxForm({
    form: 'addPassword',
    asyncValidate: asyncValidate(schema)
})(AddPassword));
