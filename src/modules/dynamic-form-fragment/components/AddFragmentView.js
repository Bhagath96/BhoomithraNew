import React, { useEffect } from 'react';
import { Field, FieldArray, Form, reduxForm } from 'redux-form';
import { Components, I18n, Icons } from '../../../common/components';
import { renderTextField, renderSimpleSelect } from '../../../utils/FormUtils';
import { useDispatch, useSelector } from 'react-redux';
import { loadLanguagesForFragment, loadTitlesForFragments, sentFragment } from '../actions';
import { STATE_REDUCER_KEY } from '../constants';
import _ from '../../../utils/LodashUtils';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import validate from './validate';
import { liteBoxShadow } from '../../../assets/css/bhoom';
const { Grid, Button, IconButton, CardHeader, CardComponent } = Components;
import LoadingCustomOverlay from '../../../common/components/custom/LoadingOverlay';

const { AddBoxTwoTone } = Icons;

const renderFragment = ({ fields, change, meta: { error }, languages, title }) => (
    <ul>
        <li style={{ listStyle: 'none' }}>
            <CardHeader style={{ marginLeft: '-57px' }}
                action={
                    <IconButton aria-label="Options" onClick={() => fields.push({})} className='addButton'>
                        <AddBoxTwoTone />
                    </IconButton>
                }
                title={title}

            />

        </li>
        {fields?.map((labelItem, index) => (
            <div key={index}>
                <Grid container spacing={2} key={index} padding={1} style={{ marginBottom: '20px', padding: '0 20px' }} justify="space-around" alignItems="center">
                    <Grid item xs={5} >
                        <Field name={`${labelItem}.langId`} label={I18n.t('language')} component={renderSimpleSelect} onChange={(value) =>
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
                            label={I18n.t('label')}
                        />
                    </Grid>
                    <Grid item xs={2} >
                        <IconButton className='deleteButton' style={{ marginTop: '27px' }} onClick={() => fields.remove(index)}> <DeleteForeverIcon /></IconButton>
                    </Grid>
                </Grid>
            </div>
        ))}
        {error && <li className="error">{error}</li>}
    </ul>
);

function AddFragmentView(props) {
    const dispatch = useDispatch();
    const { handleSubmit, submitting, change } = props;
    useEffect(() => {
        dispatch(loadLanguagesForFragment());
        dispatch(loadTitlesForFragments());
    }, []);
    change('type', 1);
    const submit = (values) => {
        dispatch(sentFragment(values));

    };
    const titleDetails = useSelector(state => state[STATE_REDUCER_KEY]);
    const { languages, title } = titleDetails;
    return (
        <CardComponent>
            <LoadingCustomOverlay active={title.requestInProgress}>
                <Form onSubmit={handleSubmit(submit)}>
                    <Grid container style={{ ...liteBoxShadow, padding: '10px' }} justify='space-evenly' alignItems='center' >
                        <Grid item xs={5} >
                            <Field
                                name='name'
                                type="text"
                                component={renderTextField}
                                label={I18n.t('name')}
                            />
                        </Grid>
                        <Grid item xs={5} >
                            <Field
                                name='key'
                                type="text"
                                component={renderTextField}
                                label={I18n.t('key')}
                            />
                        </Grid>
                    </Grid>
                    <Grid padding={2} direction='column' justify='space-between' alignItems='center' style={{ ...liteBoxShadow, padding: '10px' }}>
                        <FieldArray name="label" component={renderFragment} languages={languages} titles={title} change={change} title={I18n.t('fragments')} />
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <Button type="submit" disabled={submitting} >{I18n.t('submit')}</Button>
                    </Grid>
                </Form>
            </LoadingCustomOverlay>
        </CardComponent>
    );
}

export default reduxForm({
    form: 'FragmentAddForm',
    validate
})(AddFragmentView);
