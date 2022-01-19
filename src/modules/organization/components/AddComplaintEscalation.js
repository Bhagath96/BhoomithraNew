import React, { useEffect } from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { useParams } from 'react-router-dom';
import { renderTextField, renderSelect } from '../../../utils/FormUtils';
import MuiAccordion from '@material-ui/core/Accordion';
import { makeStyles, Components, I18n } from '../../../common/components';
import _ from '../../../utils/LodashUtils';
import { useDispatch, useSelector, connect } from 'react-redux';
import * as Actions from '../actions';
import * as constant from '../constants';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';

const { Grid, Button, CardComponent } = Components;

(MuiAccordion);
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


const validate = values => {
    // let newArray = [];
    const errors = {};
    if (!_.has(values, 'mxConfig') || _.get(values, 'mxConfig', null) === null) {
        _.set(errors, 'mxConfig', I18n.t('required', { type: I18n.t('complaints') }));
    }
    if (!_.has(values, 'role') || _.get(values, 'role', null) === null) {
        _.set(errors, 'role', I18n.t('required', { type: I18n.t('role') }));
    }
    if (!_.has(values, 'minMinutes') || _.get(values, 'minMinutes', null) === null) {
        _.set(errors, 'minMinutes', I18n.t('required', { type: I18n.t('min_mins') }));
    }
    if (!_.has(values, 'maxMinutes') || _.get(values, 'maxMinutes', null) === null) {
        _.set(errors, 'maxMinutes', I18n.t('required', { type: I18n.t('max_mins') }));
    }
    if (!_.has(values, 'templateType') || _.get(values, 'templateType', null) === null) {
        _.set(errors, 'templateType', I18n.t('required', { type: I18n.t('template_type') }));
    }
    if (!_.has(values, 'template') || _.get(values, 'template', null) === null) {
        _.set(errors, 'template', I18n.t('required', { type: I18n.t('templates') }));
    }
    return errors;

};

function ComplaintEscalationMatrixCreate(props) {
    const { id: ordId, complaintEscalationId: cemId } = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();
    const { handleSubmit } = props;
    const { listComplaints: { data: complaintList, requestInProgress }, listRoles: { data: roleList }, listTemplate: { data: templateList }, listTemplateType: { data: templateTypeList } } = useSelector(state => state[constant.STATE_REDUCER_KEY]);
    useEffect(() => {
        dispatch(Actions.listComplaints());
        dispatch(Actions.listRoles());
        dispatch(Actions.listTemplateType());
        dispatch(Actions.listTemplate());
    }, []);
    useEffect(() => {
        if (cemId) {
            dispatch(Actions.getComplaintEscalationById(ordId, cemId));
        }
    }, [cemId]);
    const submit = (values) => {
        let object = {};
        object.mxConfigId = values.mxConfig?.id;
        object.roleId = values.role?.id;
        object.minMinutes = values.minMinutes;
        object.maxMinutes = values.maxMinutes;
        object.templateTypeId = values.templateType?.id;
        object.templateId = values.template?.id;
        if (cemId) {
            dispatch(Actions.updateComplaintEscalation(ordId, cemId, object));
        } else {
            dispatch(Actions.saveComplaintEscalation(ordId, object));
        }

    };
    const readOnlyPermission = hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_COMPLAINT_ESCALATION_MATRIX_DETAILS, ACTION_MAPPING.ORGANIZATION_COMPLAINT_ESCALATION_MATRIX_DETAILS.READ_ONLY);

    return (
        <CardComponent>
            <Form onSubmit={handleSubmit(submit)} autoComplete='off'>
                <Grid container>

                    <Grid item xs={6} sm={6} md={6} className={classes.item} style={{ marginBottom: '20px', maxHeight: '100%', overflow: 'scrollbars' }}>
                        <Field disabled={readOnlyPermission} showLoader={requestInProgress} name='mxConfig' label={I18n.t('complaints')} type='text' component={renderSelect} style={{ position: 'absolute' }} >
                            {
                                complaintList?.map(item => ({ id: item.id, name: item.name }))
                            }
                        </Field>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className={classes.item} style={{ marginBottom: '20px', maxHeight: '100%', overflow: 'scrollbars' }}>
                        <Field disabled={readOnlyPermission} name='role' label={I18n.t('role')} type='text' component={renderSelect} style={{ position: 'absolute' }}
                        >
                            {
                                roleList?.map(item => ({ id: item.pk, name: item.name }))
                            }
                        </Field>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field disabled={readOnlyPermission} name='minMinutes' label={I18n.t('min_mins')} type='number' component={renderTextField} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field disabled={readOnlyPermission} name='maxMinutes' label={I18n.t('max_mins')} type='number' component={renderTextField} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className={classes.item} style={{ marginBottom: '50px', maxHeight: '100%', overflow: 'scrollbars' }}>
                        <Field disabled={readOnlyPermission} name='templateType' label={I18n.t('template_type')} type='text' component={renderSelect} style={{ position: 'absolute' }}
                        >
                            {
                                templateTypeList?.map(item => ({ id: item.id, name: item.name }))
                            }
                        </Field>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className={classes.item} style={{ marginBottom: '50px', maxHeight: '100%', overflow: 'scrollbars' }}>
                        <Field disabled={readOnlyPermission} name='template' label={I18n.t('templates')} type='text' component={renderSelect} style={{ position: 'absolute' }}
                        >
                            {
                                templateList?.map(item => ({ id: item.id, name: item.name }))
                            }
                        </Field>
                    </Grid>
                    {!readOnlyPermission && <Grid item xs={12} className={classes.submit}>
                        <Button type="submit">{I18n.t('submit')}</Button>
                    </Grid>
                    }
                </Grid>
            </Form>
        </CardComponent>
    );
}
export default connect(state => ({
    initialValues: state[constant.STATE_REDUCER_KEY]?.fetchComplaintEscalationById?.data
}))(reduxForm({
    form: 'complaintEscalationMatrixCreate',
    enableReinitialize: true,
    validate
})(ComplaintEscalationMatrixCreate));
