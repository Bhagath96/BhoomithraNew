import React from 'react';
import { changePassword } from '../actions';
import { Field, Form, reduxForm } from 'redux-form';
import { makeStyles, Components } from '../../../common/components';
import { renderTextField } from '../../../utils/FormUtils';
import { useDispatch } from 'react-redux';
import LoadingOverlay from '../../../common/components/custom/LoadingOverlay.js';
const { Grid, Button } = Components;

const validate = (values) => {
    const errors = {};
    if (!values.oldPassword) {
        errors.oldPassword = 'Old Password Required';
    }
    if (!values.password) {
        errors.password = ' New Password Required';
    } else if (values.password === values.oldPassword) {
        errors.password = 'Old and new password should not be same';
    }

    return errors;
};

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
function ChangePassword(props) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [showOldPassword, setShowOldPassword] = React.useState(true);
    const [showNewPassword, setShowNewPassword] = React.useState(true);
    const { handleSubmit } = props;
    const submit = (values) => {
        dispatch(changePassword(values));
    };

    return (
        <div>
            <Form onSubmit={handleSubmit(submit)} autoComplete='off'>
                <LoadingOverlay >
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field name='oldPassword' label="Old Password" type={showOldPassword ? 'password' : 'text'} component={renderTextField}
                                adornment={{ isVisible: true, onClick: () => setShowOldPassword(!showOldPassword), show: showOldPassword }} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field name='password' label="New Password" type={showNewPassword ? 'password' : 'text'} component={renderTextField}
                                adornment={{ isVisible: true, onClick: () => setShowNewPassword(!showNewPassword), show: showNewPassword }} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.submit}>
                        <Button type="submit">Submit</Button>
                    </Grid>
                </LoadingOverlay>
            </Form>
        </div>
    );
}


export default reduxForm({
    form: 'changePassword',
    validate

})(ChangePassword);

