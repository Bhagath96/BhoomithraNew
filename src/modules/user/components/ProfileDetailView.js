import React, { useEffect } from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { makeStyles, Components } from '../../../common/components';
import { renderTextField } from '../../../utils/FormUtils';
import { useDispatch, connect, useSelector } from 'react-redux';
import { STATE_REDUCER_KEY } from '../constants';
import { getUserProfileDetails, sentUserDetails } from '../actions';
import LoadingCustomOverlay from '../../../common/components/custom/LoadingOverlay';
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

function ProfileDetailView(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { handleSubmit } = props;
    const requestInProgress = useSelector(state => state[STATE_REDUCER_KEY].userProfile.requestInProgress);


    useEffect(() => {
        dispatch(getUserProfileDetails());
    }, []);
    const submit = (values) => {
        let userId = values.id;
        let userDetails = {
            firstName: '',
            middleName: '',
            lastName: '',
            userTypeId: ''
        };
        userDetails.firstName = values.firstName;
        userDetails.lastName = values.lastName;
        userDetails.middleName = values.middleName;
        userDetails.username = values.username;
        userDetails.userTypeId = userId;
        dispatch(sentUserDetails(userId, userDetails));
    };

    return (
        <div>
            <LoadingCustomOverlay active={requestInProgress}>
                <Form onSubmit={handleSubmit(submit)} autoComplete='off'>
                    <Grid container className={classes.item}>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field name='firstName' label="First Name" component={renderTextField} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field name='middleName' label="Middle Name" component={renderTextField} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field name='lastName' label="Last Name" component={renderTextField} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.submit}>
                        <Button type="submit">Submit</Button>
                    </Grid>
                </Form>
            </LoadingCustomOverlay>
        </div>
    );
}


export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].userProfile.data
}))(reduxForm({
    form: 'userProfileForm',
    enableReinitialize: true
    // validate
})(ProfileDetailView));
