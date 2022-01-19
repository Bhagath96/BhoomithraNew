import React, { useEffect } from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, connect } from 'react-redux';
import _ from 'lodash';

import { makeStyles, Components, I18n } from '../../../../common/components';
import { STATE_REDUCER_KEY } from '../../constants';
import * as Actions from '../../actions';
import { renderTextField, renderSelect } from '../../../../utils/FormUtils';
import { isIntegerOrDouble } from '../../../../utils/ValidationUtils';

const { Grid, Button, CardComponent } = Components;

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1
    },
    item: {
        padding: theme.spacing(1)
    },
    submit: {
        textAlign: 'center'
    },
    '.MuiButton-label': {
        '&:hover': {
            color: 'black'
        }
    }
}));

function CreateAssignVendors(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id, vendorId } = useParams();
    const { handleSubmit } = props;
    const { listItems: { data: items = [] }, listItemType: { data: itemType = [] } } = useSelector(state => state[STATE_REDUCER_KEY]);

    useEffect(() => {
        if (id && vendorId) {
            dispatch(Actions.fetchVendorById({ id, vendorId }));
        }
    }, [vendorId]);
    useEffect(() => {
        dispatch(Actions.getAllItems());
        dispatch(Actions.getAllItemType());
    }, []);
    const submit = (values) => {
        let { item: { id: itemId } = {}, itemType: { id: itemTypeId } = {}, ratePerGram: ratePerGm } = values;
        let assignVendorData = {
            organizationId: Number(id),
            itemId,
            itemTypeId,
            ratePerGm
        };
        if (vendorId) {
            dispatch(Actions.updatesVendorData({ id, vendorId, assignVendorData }));
        } else {
            dispatch(Actions.saveVendorData({ id, assignVendorData }));
        }
    };

    return (
        <CardComponent>
            <Form onSubmit={handleSubmit(submit)} autoComplete='off'>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>
                        <Field name='item' label={I18n.t('item')} component={renderSelect}>
                            {items || []}
                        </Field>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>
                        <Field name='itemType' label={I18n.t('item_type')} component={renderSelect}>
                            {itemType || []}
                        </Field>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>
                        <Field name='ratePerGram' label={I18n.t('rate_per_gram')} component={renderTextField} />
                    </Grid>
                    <Grid item xs={12} className={classes.submit}>
                        <Button type="submit">{I18n.t('submit')}</Button>
                    </Grid>
                </Grid>
            </Form>
        </CardComponent>
    );
}

const validateAssignCreateVendorItem = (values) => {
    const errors = {};
    if (!_.has(values, 'item') || _.get(values, 'item.id', null) === null) {
        _.set(errors, 'item', I18n.t('required', { type: I18n.t('item') }));
    }
    if (!_.has(values, 'itemType') || _.get(values, 'itemType.id', null) === null) {
        _.set(errors, 'itemType', I18n.t('required', { type: I18n.t('item_type') }));
    }
    let ratePerGram = _.get(values, 'ratePerGram', null);
    if (!_.has(values, 'ratePerGram') || ratePerGram === null) {
        _.set(errors, 'ratePerGram', I18n.t('required', { type: I18n.t('rate_per_gram') }));
    } else {
        if (!isIntegerOrDouble(ratePerGram)) {
            _.set(errors, 'ratePerGram', I18n.t('number_only_message'));
        }
    }
    return errors;
};

export default
    connect(state => ({
        initialValues: state[STATE_REDUCER_KEY].fetchVendorById.data
    }))(reduxForm({
        form: 'createAssignVendor',
        enableReinitialize: true,
        validate: validateAssignCreateVendorItem
    })(CreateAssignVendors));

