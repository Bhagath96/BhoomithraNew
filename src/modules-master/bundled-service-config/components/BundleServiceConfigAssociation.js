import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Field, Form, FormSection, isDirty, reduxForm } from 'redux-form';
import { Components, I18n, makeStyles } from '../../../common/components';
import { STATE_REDUCER_KEY } from '../constants';
import _ from '../../../utils/LodashUtils';
import * as Actions from '../actions';
import LoadingOverlay from '../../../common/components/custom/LoadingOverlay.js';
import * as Action from '../../../modules/common/actions';
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
export const BundleServiceConfigAssociation = (props) => {
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
    const classes = useStyles();
    const dispatch = useDispatch();
    const BundleServiceConfigAssignList = useSelector(state => _.get(state, STATE_REDUCER_KEY, {}));
    const { assignBundledServiceConfigList } = BundleServiceConfigAssignList;
    const { id } = useParams();


    useEffect(() => {
        dispatch(Actions.fetchBundledServiceConfig(id));

    }, []);

    const submit = (values) => {
        dispatch(Actions.saveBundledServiceConfigChk({ ...values, organizationId: id }));
        dispatch(Action.resetFormChange());
    };
    useEffect(() => {
        if (props.dirty) {
            dispatch(Action.setFormChange({ form: 'assignBundledServiceConfigsView', isDirty: true }));
        }
    }, [props.dirty]);
    return (
        <Form onSubmit={props.handleSubmit(submit)}>
            <LoadingOverlay active={assignBundledServiceConfigList?.requestInProgress}>
                <FormSection name="formData">
                    <Grid container >
                        {renderCheckBoxes(_.get(assignBundledServiceConfigList, 'data', []))}
                    </Grid>
                </FormSection>
                <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                    <Button type="submit">{I18n.t('submit')}</Button>
                </Grid>
            </LoadingOverlay>
        </Form >
    );
};

export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].assignBundledServiceConfigsView,
    dirty: isDirty('assignBundledServiceConfigsView')
}))(reduxForm({
    form: 'assignBundledServiceConfigsView',
    enableReinitialize: true
})(BundleServiceConfigAssociation));
