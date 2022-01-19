import React, { useEffect, useState } from 'react';
import { Field, reduxForm, Form } from 'redux-form';
import { Components, I18n, makeStyles } from '../../../common/components';
import { renderTextField, renderSelect } from '../../../utils/FormUtils';
import { useDispatch, useSelector, connect } from 'react-redux';
import { saveTemplate, fetchTemplateTypes, fetchTemplateDetailsById, resetAddTemplateForm } from '../actions';
import { STATE_REDUCER_KEY } from '../constants';
import { useParams } from 'react-router-dom';
import { addTemplate } from '../validations';
import { renderCard } from '../../../assets/css/bhoom';
import * as Action from '../../common/actions';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';

const { Grid, Button, LoadingOverlay, CardComponent } = Components;

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

function AddTemplate(props) {
    const dispatch = useDispatch();
    const { handleSubmit, submitting, change } = props;
    const classes = useStyles();
    const { id = null } = useParams();
    const [isDisabled, setIsDisabled] = useState(null);
    const { templateTypes: { data: templateTypeList = [], requestInProgress: typeRequestInProgress = false } = {}, addTemplate: addedTemplate, templateUpdateSuccessNotifyFlag } = useSelector(state => state[STATE_REDUCER_KEY]);
    const { flagForSuccess } = templateUpdateSuccessNotifyFlag;
    useEffect(() => {
        if (flagForSuccess === true) {

            setIsDisabled(true);
        }
    }, [flagForSuccess]);
    const { data } = addedTemplate;
    const { readonly } = data;
    useEffect(() => {
        if (readonly === true) {

            setIsDisabled(true);
        } else {
            setIsDisabled(false);

        }

    }, [readonly]);

    useEffect(() => {
        dispatch(fetchTemplateTypes());
        if (id !== null) {
            dispatch(fetchTemplateDetailsById(id));
        } else {
            setIsDisabled(false);
            dispatch(resetAddTemplateForm());
        }
    }, []);


    const submit = (values) => {
        props.change('templateId', id);
        dispatch(saveTemplate({ ...values, templateId: id }));
        dispatch(Action.resetFormChange());

    };

    const readOnly = hasAccessPermission(RESOURCE_MAPPING.TEMPLATE_DETAILS, ACTION_MAPPING.TEMPLATE_DETAILS.READ_ONLY);

    return (
        <CardComponent>
            <Form onSubmit={handleSubmit(submit)} style={renderCard.form} >
                <LoadingOverlay active={typeRequestInProgress}>
                    <Grid container spacing={3} className={classes.item}>
                        <Grid item xs={12} sm={12} md={12} >
                            <Field name='name' type="text" component={renderTextField} label={I18n.t('name')} disabled={readOnly} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                            <Field name='key' type="text" component={renderTextField} label={I18n.t('key')} disabled={readOnly} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                            <Field name='version' type="text" component={renderTextField} label={I18n.t('version')} disabled={isDisabled} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                            <Field name='templateTypeId' label={I18n.t('template_type')} filterable component={renderSelect} disabled={readOnly} onChange={(value) =>
                                change('templateTypeId', value)} >
                                {
                                    templateTypeList
                                }
                            </Field>
                        </Grid>
                    </Grid>
                    {!readOnly &&
                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <Button type="submit" disabled={submitting} >{(id !== null) ? I18n.t('update') : I18n.t('submit')}</Button>
                        </Grid>
                    }
                </LoadingOverlay>
            </Form >
        </CardComponent>
    );
}

export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].addTemplate.data
}))(reduxForm({
    form: 'addTemplateForm',
    enableReinitialize: true,
    validate: addTemplate
})(AddTemplate));
