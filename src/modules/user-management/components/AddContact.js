import React, { useEffect } from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { makeStyles, Components, I18n } from '../../../common/components';
import { renderTextField, renderSelect } from '../../../utils/FormUtils';
import { useDispatch, useSelector, connect } from 'react-redux';
import { STATE_REDUCER_KEY } from '../constants';
import { useParams } from 'react-router-dom';
import _ from '../../../utils/LodashUtils';
import { listContactDetails, editContactDetails } from '../actions';
import { listCountryCode } from '../actions';
const { Grid, Button } = Components;
import LoadingOverlay from '../../../common/components/custom/LoadingOverlay.js';
import * as Action from '../../common/actions';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    item: {
        padding: theme.spacing(1)
    },
    submit: {
        textAlign: 'center'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    selectMargin: {
        marginTop: '13px',
        padding: theme.spacing(1)
    }
}));

const validate = (values) => {
    const errors = {};
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = I18n.t('please_enter_valid_email_addr');
    }
    if (!values.mobile) {
        errors.mobile = I18n.t('please_enter_phone_number');
    } else if (isNaN(Number(values.mobile))) {
        errors.mobile = I18n.t('is_not_valid');
    } else if (values.mobile.length < 10) {
        errors.mobile = I18n.t('please_enter_valid_phone_number');
    } else if (values.mobile.length > 10) {
        errors.mobile = I18n.t('please_enter_valid_phone_number');
    }
    if (_.get(values, 'country.id', null) === null) {
        _.set(errors, 'country', I18n.t('required', { type: I18n.t('country') }));
    }

    if (values.atlernativeMobile) {
        if (isNaN(Number(values.atlernativeMobile))) {
            errors.atlernativeMobile = I18n.t('is_not_valid');
        } else if (values.atlernativeMobile.length < 10) {
            errors.atlernativeMobile = I18n.t('please_enter_valid_phone_number');
        } else if (values.atlernativeMobile?.length > 10) {
            errors.atlernativeMobile = I18n.t('please_enter_valid_phone_number');
        }
        if (_.get(values, 'altCountry.id', null) === null) {
            _.set(errors, 'altCountry', I18n.t('required', { type: I18n.t('country') }));
        }
    }
    return errors;
};
function AddContact(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();
    const { handleSubmit } = props;
    useEffect(() => {
        dispatch(listContactDetails(id));
        dispatch(listCountryCode());
    }, []);
    const {
        editUserContact: { requestInProgress: editRequestInProgress = false } = {},
        countryCodes: { data: countryList = [], requestInProgress: countryListRequestInProgress = false } = {}
    } = useSelector(state => state[STATE_REDUCER_KEY]);

    const submit = (values) => {
        let contactRequest = {
            email: _.get(values, 'email', null),
            mobile: _.get(values, 'mobile', null),
            countryId: _.get(values, 'country.id', null)
        };
        let atlernativeMobile = _.get(values, 'atlernativeMobile', null);
        let altCountryId = _.get(values, 'altCountry.id', null);
        if (atlernativeMobile && altCountryId && atlernativeMobile !== 0) {
            contactRequest = {
                ...contactRequest,
                atlernativeMobile,
                altCountryId
            };
        }
        dispatch(editContactDetails(id, contactRequest));
        dispatch(Action.resetFormChange());
    };

    return (
        <div>
            <Form onSubmit={handleSubmit(submit)}>
                <LoadingOverlay active={editRequestInProgress}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field name='email' label={I18n.t('email')} component={renderTextField} />
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} className={classes.selectMargin}>
                            <Field showLoader={countryListRequestInProgress} spinnerProps="selectTagProp" name="country" component={renderSelect}>
                                {countryList}
                            </Field>
                        </Grid>
                        <Grid item xs={10} sm={10} md={10} className={classes.item}>
                            <Field name='mobile' label={I18n.t('phone_number')} component={renderTextField} />
                        </Grid>
                        <Grid item xs={2} className={classes.selectMargin}>
                            <Field showLoader={countryListRequestInProgress} spinnerProps="selectTagProp" name="altCountry" component={renderSelect} >
                                {countryList}
                            </Field>
                        </Grid>
                        <Grid item xs={10} className={classes.item}>
                            <Field name='atlernativeMobile' label={I18n.t('alternative_phone_number')} component={renderTextField} />
                        </Grid>

                    </Grid>
                    <Grid item xs={12} className={classes.submit}>
                        <Button type='submit'>{I18n.t('submit')}</Button>
                    </Grid>
                </LoadingOverlay>
            </Form>
        </div >
    );
}

export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].getUserContactDetail.data
}))(reduxForm({
    form: 'AddContactform',
    enableReinitialize: true,
    validate
})(AddContact));
