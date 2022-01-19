import React, { useEffect } from 'react';
import { Field, FieldArray, Form, reduxForm } from 'redux-form';
import { Components, Icons } from '../../../common/components';
import { renderTextField, renderSelect } from '../../../utils/FormUtils';
import { useDispatch, useSelector, connect } from 'react-redux';
import { loadQuestions, sentQuestionAndSortOrder, getQuestionForTitle, resetQuestion } from '../actions';
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

const renderLabel = ({ fields, meta: { error }, questions, disabled }) => (
    <ul>
        <li style={{ listStyle: 'none' }}>
            <CardHeader
                action={
                    <IconButton disabled={disabled} className='addButton' aria-label="Options" onClick={() => fields.push({})} >
                        <AddBoxTwoTone />
                    </IconButton>
                }
                title={i18n.t('questions')}

            />

        </li>
        {fields?.map((labelItem, index) => (
            <div key={index}>
                <Grid container spacing={3}>
                    <Grid item xs={6} >
                        <Field disabled={disabled} name={`${labelItem}.question`} label={i18n.t('questions')} filterable component={renderSelect} onChange={(value) =>
                            value} >
                            {
                                _.get(questions, 'data', [])
                            }
                        </Field>
                    </Grid>
                    <Grid item xs={2} >
                        <Field
                            disabled={disabled}
                            name={`${labelItem}.sort`}
                            type="number"
                            component={renderTextField}
                            label={i18n.t('sort_order')}
                        />
                    </Grid>
                    <Grid item xs={2} style={{ marginTop: '30px' }}>
                        <Field
                            disabled={disabled}
                            component="input"
                            name={`${labelItem}.showLabel`}
                            type="checkbox" />
                        <span>{i18n.t('label')}</span>
                    </Grid>
                    <Grid item xs={2} >
                        <IconButton disabled={disabled} style={{ padding: 0, marginTop: '28px' }} onClick={() => fields.remove(index)}> <DeleteForeverIcon /></IconButton>
                    </Grid>
                </Grid>
            </div>
        ))}
        { error && <li className="error">{error}</li>}
    </ul >
);

function QuestionsListView(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { handleSubmit, submitting, change } = props;
    let languageId = 1;
    let questionType = 'dropdown';
    useEffect(() => {
        dispatch(loadQuestions(languageId, questionType));
        if (id) {
            dispatch(getQuestionForTitle(id));
        }

    }, []);
    const { question } = useSelector(state => state[STATE_REDUCER_KEY]);
    const { questionTab, requestInProgress = false } = question;
    useEffect(() => {
        if (questionTab === undefined) {
            dispatch(resetQuestion());
        }
    }, [questionTab]);

    // const { languages } = question;
    const submit = (values) => {
        change('type', 1);
        let newArray = values.question?.map((item) => {
            let newObj = {
                questionId: '',
                sort: 0,
                showLabel: false
            };
            newObj.questionId = item.question.id;
            newObj.sort = Number(item.sort);
            newObj.showLabel = item.showLabel ? item.showLabel : false;
            return newObj;
        });
        let objToSend = {
            question: []
        };
        objToSend.question = newArray;
        dispatch(sentQuestionAndSortOrder(id, objToSend));
        dispatch(Action.resetFormChange());

    };
    const readOnlyPermission = hasAccessPermission(RESOURCE_MAPPING.TITLE_QUESTION, ACTION_MAPPING.TITLE_QUESTION.READ_ONLY);

    return (
        <CardComponent >
            <LoadingCustomOverlay active={requestInProgress}>
                <Form onSubmit={handleSubmit(submit)}>
                    <Grid container spacing={2} padding={2} direction='column' justify='space-between'>
                        <Grid item style={liteBoxShadow} xs={12} sm={12} md={12}>
                            <FieldArray disabled={readOnlyPermission} name="question" component={renderLabel} questions={question} change={change} />
                        </Grid>
                        {!readOnlyPermission && <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <Button type="submit" disabled={submitting} >{i18n.t('submit')}</Button>
                        </Grid>}
                    </Grid>
                </Form>
            </LoadingCustomOverlay>
        </CardComponent>

    );
}


export default
    connect(state => ({
        initialValues: state[STATE_REDUCER_KEY].questionTab
    }))(reduxForm({
        validate,
        form: 'questionForm',
        enableReinitialize: true
    })(QuestionsListView));
