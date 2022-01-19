
import React, { useEffect } from 'react';
import { Field, FieldArray, Form, reduxForm } from 'redux-form';
import { Components, Icons } from '../../../common/components';
import { renderTextField, renderSimpleSelect } from '../../../utils/FormUtils';
import { useDispatch, useSelector, connect } from 'react-redux';
import { loadLanguagesForFragment, loadTitlesForFragments, getBasicDetailsOfTitle, editFragmentBasicDetail } from '../actions';
import { STATE_REDUCER_KEY } from '../constants';
import _ from '../../../utils/LodashUtils';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useParams } from 'react-router-dom';
import validate from './validate';
import { liteBoxShadow } from '../../../assets/css/bhoom';
import * as Action from '../../common/actions';
import LoadingCustomOverlay from '../../../common/components/custom/LoadingOverlay';
import i18n from '../../../i18n';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';


const { Grid, Button, IconButton, CardHeader, CardComponent } = Components;

const { AddBoxTwoTone } = Icons;


const renderFragment = ({ fields, change, meta: { error }, languages, disabled }) => (
    <ul>
        <li style={{ listStyle: 'none' }}>
            <CardHeader style={{ marginLeft: '-57px' }}
                action={
                    <IconButton disabled={disabled} aria-label="Options" onClick={() => fields.push({})} className='addButton'>
                        <AddBoxTwoTone />
                    </IconButton>
                }
                title={i18n.t('fragment')}
            />

        </li>
        {fields?.map((labelItem, index) => (
            <div key={index}>
                <Grid container key={index} padding={1} style={{ marginBottom: '20px', padding: '0 20px' }} justify="space-around" alignItems="center">
                    <Grid item xs={5} style={{ marginBottom: '4px', padding: '0 10px' }}>
                        <Field name={`${labelItem}.langId`} label={i18n.t('language')} disabled={disabled} component={renderSimpleSelect} onChange={(value) =>
                            change(`${labelItem}.langId`, value.target.value)} >
                            {
                                _.get(languages, 'data', [])
                            }
                        </Field>
                    </Grid>
                    <Grid item xs={5} >
                        <Field
                            name={`${labelItem}.label`}
                            type="text"
                            component={renderTextField}
                            label={i18n.t('label')}
                            disabled={disabled}
                        />
                    </Grid>
                    <Grid item xs={2} >
                        <IconButton className='deleteButton' disabled={disabled} style={{ marginTop: '27px' }} onClick={() => fields.remove(index)}> <DeleteForeverIcon /></IconButton>
                    </Grid>
                </Grid>
            </div>
        ))}
        {error && <li className="error">{error}</li>}
    </ul>
);

function FragmentBasicDetailView(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { handleSubmit, submitting, change } = props;
    const titleDetails = useSelector(state => state[STATE_REDUCER_KEY]);
    const { languages, title } = titleDetails;
    useEffect(() => {
        dispatch(loadLanguagesForFragment());
        dispatch(loadTitlesForFragments());
        if (id) {
            dispatch(getBasicDetailsOfTitle(id));
        }

    }, []);
    const submit = (values) => {
        dispatch(editFragmentBasicDetail(id, { ...values, type: 1 }));
        dispatch(Action.resetFormChange());

    };

    const readOnly = hasAccessPermission(RESOURCE_MAPPING.FRAGMENT_DETAILS, ACTION_MAPPING.FRAGMENT_DETAILS.READ_ONLY);


    return (
        <CardComponent>
            <LoadingCustomOverlay active={title.requestInProgress}>
                <Form onSubmit={handleSubmit(submit)}>
                    <Grid container spacing={2} padding={2} direction='column' justify='space-between' >
                        <Grid container spacing={2} padding={2} direction='row'>
                            <Grid item xs={6}>
                                <Field
                                    name='name'
                                    type="text"
                                    component={renderTextField}
                                    label={i18n.t('name')}
                                    disabled={readOnly}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    name='key'
                                    type="text"
                                    component={renderTextField}
                                    label={i18n.t('key')}
                                    disabled={readOnly}
                                />
                            </Grid>
                        </Grid>
                        <Grid item style={liteBoxShadow} xs={12} sm={12} md={12}>
                            <FieldArray name='label' disabled={readOnly} component={renderFragment} languages={languages} titles={title} change={change} />
                        </Grid>
                        {!readOnly &&
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Button type="submit" disabled={submitting} >{i18n.t('submit')}</Button>
                            </Grid>
                        }
                    </Grid>
                </Form>
            </LoadingCustomOverlay>
        </CardComponent >

    );
}

export default
    connect(state => ({
        initialValues: state[STATE_REDUCER_KEY].basicDetailsOfFragment
    }))(reduxForm({
        form: 'FragmentBasicDetailViewForm',
        enableReinitialize: true,
        validate
    })(FragmentBasicDetailView));
