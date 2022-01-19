import React, { useEffect } from 'react';
import { Field, FieldArray, Form, reduxForm } from 'redux-form';
import { Components, I18n, Icons } from '../../../common/components';
import { renderTextField, renderSimpleSelect } from '../../../utils/FormUtils';
import { useDispatch, useSelector } from 'react-redux';
import { loadLanguagesForTitle, sentTitleLabel } from '../actions';
import { STATE_REDUCER_KEY } from '../constants';
import _ from '../../../utils/LodashUtils';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import validate from './validate';
import { liteBoxShadow } from '../../../assets/css/bhoom';
const { Grid, Button, IconButton, CardHeader, CardComponent } = Components;
import { useParams } from 'react-router-dom';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';

const { AddBoxTwoTone } = Icons;

const renderLabel = ({ fields, change, meta: { error }, languages, title = 'Label', disabled }) => (
    <ul>
        <li style={{ listStyle: 'none' }}>
            <CardHeader
                action={
                    <IconButton disabled={disabled} aria-label="Options" onClick={() => fields.push({})} className='addButton'>
                        <AddBoxTwoTone />
                    </IconButton>
                }
                title={title}
            />
        </li>
        {fields?.map((labelItem, index) => (
            <div key={index}>
                <Grid container spacing={2} key={index} padding={1} style={{ marginBottom: '20px', padding: '0 20px' }} justify="space-around" alignItems="center">
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
                            label={I18n.t('label')}
                        />
                    </Grid>
                    <Grid item xs={2} >
                        <IconButton disabled={disabled} style={{ marginTop: '27px' }} className='deleteButton' onClick={() => fields.remove(index)}> <DeleteForeverIcon /></IconButton>
                    </Grid>
                </Grid>
            </div>
        ))}
        {error && <li className="error">{error}</li>}
    </ul>
);

function TitleAddView(props) {
    const dispatch = useDispatch();
    // eslint-disable-next-line no-unused-vars
    const { id = null } = useParams(); // added for fixing Language translation
    const { handleSubmit, submitting, change } = props;
    useEffect(() => {
        dispatch(loadLanguagesForTitle());
    }, []);
    const titleDetails = useSelector(state => state[STATE_REDUCER_KEY]);
    const { languages } = titleDetails;
    change('type', 1);
    const submit = (values) => {
        dispatch(sentTitleLabel(values));

    };
    const readOnlyPermission = hasAccessPermission(RESOURCE_MAPPING.TITLE_DETAILS, ACTION_MAPPING.TITLE_DETAILS.READ_ONLY);

    return (
        <CardComponent >
            <Form onSubmit={handleSubmit(submit)}>
                <Grid style={{ ...liteBoxShadow, padding: '10px' }} container justify='space-evenly' alignItems='center'>
                    <Grid item xs={5} >
                        <Field
                            disabled={readOnlyPermission}
                            name='name'
                            type="text"
                            component={renderTextField}
                            label={I18n.t('name')}
                        />
                    </Grid>
                    <Grid item xs={5} >
                        <Field
                            disabled={readOnlyPermission}
                            name='key'
                            type="text"
                            component={renderTextField}
                            label={I18n.t('key')}
                        />
                    </Grid>
                </Grid>
                <Grid item style={liteBoxShadow} xs={12} sm={12} md={12}>
                    <FieldArray disabled={readOnlyPermission} name="label" component={renderLabel} languages={languages} change={change} title={I18n.t('label')} />
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Button type="submit" disabled={submitting} >{I18n.t('submit')}</Button>
                </Grid>
            </Form>
        </CardComponent>

    );
}

export default reduxForm({
    form: 'fieldArrays',
    validate
})(TitleAddView);

