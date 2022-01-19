import React, { useEffect } from 'react';
import { Field, Form, reduxForm, FieldArray } from 'redux-form';
import { useDispatch, useSelector, connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { STATE_REDUCER_KEY } from '../constants';
import { saveLabelMappings, fetchTemplateDetailsById } from '../actions';
import { renderSelect } from '../../../utils/FormUtils';
import { Components, Icons } from '../../../common/components';
import _ from '../../../utils/LodashUtils';
const { DeleteForeverIcon, AddBoxTwoTone } = Icons;
const { Grid, Button, IconButton, CardHeader, LoadingOverlay, CardComponent } = Components;

const renderOptions = ({ fields, meta: { error }, change, questionsList, labelList }) => (
    <ul>
        <li style={{ listStyle: 'none' }}>
            <CardHeader
                action={
                    <IconButton className='addButton' aria-label="Mappings" onClick={() => fields.push({})} >
                        <AddBoxTwoTone />
                    </IconButton>
                }
                title='Question Label Template Association'
            />

        </li>
        {fields?.map((labelItem, index) => (
            <div key={index}>
                <Grid container spacing={3}>
                    <Grid item xs={12} >
                        <Field name={`${labelItem}.key`} label="Label" filterable component={renderSelect} onChange={() => {
                            change(`${labelItem}.question`, null);
                        }} >
                            {
                                _.get(labelList, 'data', [])
                            }
                        </Field>
                    </Grid>

                    <Grid item xs={12} >
                        <Field name={`${labelItem}.question`} label="Question" filterable component={renderSelect} >
                            {
                                _.get(questionsList, 'data', [])
                            }
                        </Field>
                    </Grid>
                    <Grid item xs={2} >
                        <Button style={{ padding: 0 }} onClick={() => fields.remove(index)}> <DeleteForeverIcon /></Button>
                    </Grid>
                </Grid>
            </div>
        ))}
        {error && <li className="error">{error}</li>}
    </ul>
);

const AssignLabelMappings = (props) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { handleSubmit, submitting, change } = props;
    const { questionsList, labelList } = useSelector(state => state[STATE_REDUCER_KEY]);
    const submit = (values) => {
        dispatch(saveLabelMappings({ values }));
    };

    useEffect(() => {
        if (id !== null) {
            dispatch(fetchTemplateDetailsById(id));
        }
    }, []);


    return (
        <CardComponent>
            <div>
                <Form onSubmit={handleSubmit(submit)}>
                    <LoadingOverlay active={false}>
                        <FieldArray name='labelMapping' component={renderOptions} change={change} questionsList={questionsList} labelList={labelList} />
                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <Button type="submit" disabled={submitting} >Submit</Button>
                        </Grid>
                    </LoadingOverlay>
                </Form >
            </div>
        </CardComponent>
    );
};

export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].AssignLabelMappings
}))(reduxForm({
    form: 'AssignLabelMappingsForm',
    enableReinitialize: true
    // validate: addTemplate
})(AssignLabelMappings));
