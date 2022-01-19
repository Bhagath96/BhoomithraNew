import React, { useEffect, useState } from 'react';
import { Field, reduxForm, Form } from 'redux-form';
import { renderSelect, renderTextField } from '../../../utils/FormUtils';
import { Components, I18n } from '../../../common/components';
import { useDispatch, useSelector, connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAllFragments, assignFragmentsToTemplate, fetchAssignedFragment, resetAddFragmentForm } from '../actions';
import { STATE_REDUCER_KEY } from '../constants';
import { API_PROPS } from '../../../common/constants';
import { assignFragment } from '../validations';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';

const { Grid, Button, CardComponent } = Components;

function AddFragment(props) {
    const dispatch = useDispatch();
    const { id = null, fragmentId = null } = useParams();
    let [isDisabled, setIsDisabled] = useState(null);
    const { handleSubmit, submitting, change } = props;

    useEffect(() => {
        //reset Form
        dispatch(resetAddFragmentForm());
        dispatch(fetchAllFragments({ type: API_PROPS.DROP_DOWN }));
        if (fragmentId !== null) {
            setIsDisabled(true);
            dispatch(fetchAssignedFragment({ templateId: id, fragmentId }));
        } else {
            setIsDisabled(false);
        }
    }, []);

    const { fragments: { data: fragmentsList = [] } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);

    const submit = (values) => {
        dispatch(assignFragmentsToTemplate({ templateId: id, fragmentId, ...values }));
    };

    const readOnly = hasAccessPermission(RESOURCE_MAPPING.TEMPLATE_DETAILS, ACTION_MAPPING.TEMPLATE_DETAILS.READ_ONLY);

    return (
        <CardComponent>
            <Form onSubmit={handleSubmit(submit)}>
                <Field name="fragment" label={I18n.t('fragment')} disabled={isDisabled} component={renderSelect} onChange={(value) => change('fragment', value)}
                    filterable>
                    {
                        fragmentsList
                    }
                </Field>
                <Field name='sort' type="text" component={renderTextField} label={I18n.t('sort_order')} disabled={readOnly} />
                {!readOnly &&
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <Button type="submit" disabled={submitting} >{I18n.t('submit')}</Button>
                    </Grid>
                }
            </Form>
        </CardComponent>
    );
}

export default
    connect(state => ({
        initialValues: state[STATE_REDUCER_KEY].assignFragment
    }))(reduxForm({
        form: 'addFragmentTemplateForm',
        enableReinitialize: true,
        validate: assignFragment
    })(AddFragment));
