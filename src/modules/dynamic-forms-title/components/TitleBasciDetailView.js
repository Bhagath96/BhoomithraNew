import React, { useEffect } from 'react';
import { Field, FieldArray, Form, reduxForm } from 'redux-form';
import { Components, Icons, I18n } from '../../../common/components';
import { renderTextField, renderSimpleSelect } from '../../../utils/FormUtils';
import { useDispatch, useSelector, connect } from 'react-redux';
import { loadLanguagesForTitle, getLabelsForTitleWithId, sentTitleLabelForEdit } from '../actions';
import { STATE_REDUCER_KEY } from '../constants';
import _ from '../../../utils/LodashUtils';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useParams } from 'react-router-dom';
import validate from './validate';
import { liteBoxShadow, renderCard } from '../../../assets/css/bhoom';
import * as Action from '../../common/actions';
import LoadingCustomOverlay from '../../../common/components/custom/LoadingOverlay';
import i18n from '../../../i18n';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';
const { Grid, Button, IconButton, CardHeader, CardComponent } = Components;
const { AddBoxTwoTone } = Icons;
const renderLabel = ({ fields, meta: { error }, languages, change, disabled }) => (
    <ul>
        <li style={{ listStyle: 'none' }}>
            <CardHeader
                action={
                    <IconButton disabled={disabled} aria-label="Options" onClick={() => fields.push({})} className='addButton'>
                        <AddBoxTwoTone />
                    </IconButton>
                }
                title={i18n.t('label')}

            />

        </li>
        {
            fields?.map((labelItem, index) => (
                <div key={index}>
                    <Grid container spacing={3}>
                        <Grid item xs={6} >
                            <Field disabled={disabled} name={`${labelItem}.langId`} label={I18n.t('language')} component={renderSimpleSelect} onChange={(value) =>
                                change(`${labelItem}.langId`, value.target.value)} >
                                {
                                    _.get(languages, 'data', [])
                                }
                            </Field>
                        </Grid>
                        <Grid item xs={4} >
                            <Field
                                disabled={disabled}
                                name={`${labelItem}.label`}
                                type="text"
                                component={renderTextField}
                                label={i18n.t('label')}
                            />
                        </Grid>
                        <Grid item xs={2} >
                            <IconButton disabled={disabled} style={{ padding: 0, marginTop: '28px' }} onClick={() => fields.remove(index)}> <DeleteForeverIcon /></IconButton>
                        </Grid>
                    </Grid>
                </div>
            ))
        }
        {error && <li className="error">{error}</li>}
    </ul>
);
function TitleBasicDetailView(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { handleSubmit, submitting, change } = props;

    useEffect(() => {
        dispatch(loadLanguagesForTitle());
        if (id) {
            dispatch(getLabelsForTitleWithId(id));
        }

    }, []);

    const { languages, singleTitleById: { requestInProgress } } = useSelector(state => state[STATE_REDUCER_KEY]);
    const submit = (values) => {
        values.type = 1;
        dispatch(sentTitleLabelForEdit(id, values));
        dispatch(Action.resetFormChange());

    };
    const readOnlyPermission = hasAccessPermission(RESOURCE_MAPPING.TITLE_DETAILS, ACTION_MAPPING.TITLE_DETAILS.READ_ONLY);

    return (
        <CardComponent>
            <LoadingCustomOverlay active={requestInProgress}>
                <Form onSubmit={handleSubmit(submit)}>
                    <Grid style={renderCard.form} container spacing={2} padding={2} justify='space-between' >
                        <Grid item xs={6} >
                            <Field
                                disabled={readOnlyPermission}
                                name='name'
                                type="text"
                                component={renderTextField}
                                label={I18n.t('name')}
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <Field
                                disabled={readOnlyPermission}
                                name='key'
                                type="text"
                                component={renderTextField}
                                label={I18n.t('key')}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} padding={2} direction='column' justify='space-between' >
                        <Grid item xs={12} sm={12} md={12} style={{ ...liteBoxShadow }}>
                            <FieldArray disabled={readOnlyPermission} name="label" component={renderLabel} languages={languages} change={change} />
                        </Grid>
                    </Grid>
                    {!readOnlyPermission && <Grid item xs={12} style={{ textAlign: 'center' }}>

                        <Button type="submit" disabled={submitting} >{i18n.t('submit')}</Button>
                    </Grid>}
                </Form>
            </LoadingCustomOverlay>
        </CardComponent>
    );
}

export default
    connect(state => ({
        initialValues: state[STATE_REDUCER_KEY].titleTab
    }))(reduxForm({
        form: 'titleBasicDetailViewForm',
        enableReinitialize: true,
        validate
    })(TitleBasicDetailView));

