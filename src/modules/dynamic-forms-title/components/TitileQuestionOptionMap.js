import React, { useEffect } from 'react';
import { Field, FieldArray, Form, reduxForm } from 'redux-form';
import { useDispatch, useSelector, connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Components, Icons } from '../../../common/components';
import _ from '../../../utils/LodashUtils';
import { toNumber } from '../../../utils/CommonUtils';
import { withStyles } from '@material-ui/core/styles';
import { renderTextField, renderSimpleSelect, renderSelect } from '../../../utils/FormUtils';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { STATE_REDUCER_KEY } from '../constants';
import validate from './validate';
import { loadQuestions, getOptionWitQuestionId, getQuestionTitleValidation, sentQuestionOptionForEdit, getQuestionOptionValidationForTitle, loadOptionQuestions, getTitleQuestions } from '../actions';
import { Divider } from '@material-ui/core';
import { liteBoxShadow, renderCard } from '../../../assets/css/bhoom';
import * as Action from '../../common/actions';
import LoadingCustomOverlay from '../../../common/components/custom/LoadingOverlay';
import i18n from '../../../i18n';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';

const { Grid, Button, IconButton, CardHeader, CardContent, Card, CardComponent, Colors } = Components;

const { AddBoxTwoTone, DeleteForeverIcon } = Icons;

const Accordion = withStyles({
    root: {
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0
        },
        '&:before': {
            display: 'none'
        },
        '&$expanded': {
            margin: 'auto'
        }
    },
    expanded: {}
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: Colors['color-primary-100'],
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56
        }
    },
    content: {
        '&$expanded': {
            margin: '12px 0'
        }
    },
    expanded: {}
})(MuiAccordionSummary);


const renderLabels = ({ fields = [], shortLabelDisplay, disabled,
    change, languages, title = i18n.t('label') }) => {
    fields.length < 1 && fields.push({});
    return (

        <Card >
            <CardHeader
                action={
                    <IconButton disabled={disabled} className='addButton' aria-label="Options" onClick={() => fields.push({})}>
                        <AddBoxTwoTone />
                    </IconButton>
                }
                title={title}
            />
            <CardContent style={renderCard.content}>
                {fields.map((member, index) => (
                    <Accordion key={index} defaultExpanded={true} style={{ marginBottom: '10px' }} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{i18n.t('label')}{index + 1}</Typography>
                        </AccordionSummary>
                        <Card padding={3}>
                            <Grid container spacing={2} key={index} padding={1} style={{ marginBottom: '20px', padding: '0 20px' }} justify="space-around" alignItems="center" >
                                <Grid item xs={shortLabelDisplay ? 3 : 4} >
                                    <Field disabled={disabled} name={`${member}.langId`} label={i18n.t('language')} component={renderSimpleSelect} onChange={(value) =>
                                        change(`${member}.langId`, value.target.value)} >
                                        {
                                            _.get(languages, 'data', [])
                                        }
                                    </Field>
                                </Grid>
                                <Grid item xs={shortLabelDisplay ? 4 : 6} >
                                    <Field disabled={disabled} name={`${member}.label`} label={i18n.t('label')} component={renderTextField} />
                                </Grid>
                                {
                                    shortLabelDisplay ?
                                        <Grid item xs={3} >
                                            <Field disabled={disabled} name={`${member}.shortLabel`} label={i18n.t('short_label')} component={renderTextField} />
                                        </Grid> : null
                                }
                                <Grid item xs={2} >
                                    <IconButton disabled={disabled} onClick={() => fields.remove(index)} style={{ marginTop: '27px' }}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Grid>

                            </Grid>
                        </Card>
                        <Divider style={renderCard.divider} />
                    </Accordion>
                ))}
            </CardContent>
        </Card >
    );
};
const renderLabel = ({ fields = [], meta: { error }, optionQuestions, question, dispatch, validationType, change, formValues, formattedResponse, labelError, languages, disabled }) => {
    fields.length < 1 && fields.push({});
    return (

        <ul style={{ padding: '10px' }}>
            <li style={{ listStyle: 'none' }}>
                <CardHeader
                    action={
                        <IconButton disabled={disabled} className='addButton' aria-label="Options" onClick={() => fields.push({})} >
                            <AddBoxTwoTone />
                        </IconButton>
                    }
                    title={i18n.t('question_option_association')}

                />

            </li>
            {fields?.map((labelItem, index) => (
                <div key={index} style={renderCard.div}>
                    <Grid container spacing={3}>
                        <Grid item xs={11} >
                            <Field disabled={disabled} name={`${labelItem}.question`} label={i18n.t('questions')} filterable component={renderSelect} onChange={(value) => {
                                dispatch(getOptionWitQuestionId(value.id));
                                change(`${labelItem}.questionOption`, []);

                            }} >
                                {
                                    _.get(optionQuestions, 'data', [])
                                }
                            </Field>
                        </Grid>
                        <Grid item xs={1} alignContent='flex-end'>
                            <IconButton disabled={disabled} style={{ padding: 0, top: '20px' }} onClick={() => fields.remove(index)}> <DeleteForeverIcon /></IconButton>
                        </Grid>
                        <Grid item xs={12} >
                            <Field disabled={disabled} name={`${labelItem}.questionOption`} label={i18n.t('question_option')} component={renderSelect} onChange={(value) =>
                                value} >
                                {
                                    formattedResponse[_.get(formValues, `${labelItem}.question.id`, '')] || []
                                }
                            </Field>
                        </Grid>
                        <Grid item xs={12} >
                            <Field disabled={disabled} name={`${labelItem}.validationType`} label={i18n.t('questions_validation_type')} component={renderSelect} onChange={(value) =>
                                value} >
                                {
                                    _.get(validationType, 'data', [])
                                }
                            </Field>
                        </Grid>
                        <Grid item xs={12} >
                            <Field disabled={disabled} name={`${labelItem}.dependentQuestion`} label={i18n.t('questions')} filterable multiple='multiple' component={renderSelect} onChange={(value) =>
                                value} >
                                {
                                    _.get(question, 'data', [])
                                }
                            </Field>
                        </Grid>

                        <Grid item xs={12}>
                            <FieldArray disabled={disabled} name={`${labelItem}.errorMessages`} labelError={labelError} component={renderLabels} languages={languages} change={change} />
                        </Grid>
                    </Grid>
                </div>
            ))}
            {error && <li className="error">{error}</li>}
        </ul>
    );
};

function TitileQuestionOptionMap(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { handleSubmit, submitting, change } = props;
    const { languages } = useSelector(state => state[STATE_REDUCER_KEY]);
    let languageId = 1;
    let type = 'dropdown';
    const typeId = 5;
    useEffect(() => {
        dispatch(loadQuestions(languageId, type));
        dispatch(getQuestionTitleValidation());
        dispatch(loadOptionQuestions(id, typeId));
        if (id) {
            dispatch(getQuestionOptionValidationForTitle(id));
        }

    }, []);
    const validationType = useSelector(state => state[STATE_REDUCER_KEY].titleQuestionValidation);
    const questionOption = useSelector(state => state[STATE_REDUCER_KEY].optionsByQuestionId);
    const getTitleQuestionsOnly = useSelector(state => state[STATE_REDUCER_KEY].getTitleQuestionsOnly);

    const options = useSelector(state => state[STATE_REDUCER_KEY].optionTab);
    const formattedResponse = useSelector(state => state[STATE_REDUCER_KEY].formattedResponse);
    const { getOptionQuestions } = useSelector(state => state[STATE_REDUCER_KEY]);
    const initialValues = useSelector(state => _.get(state, 'form.tileQuestionOptionForm', {}));
    const formValues = _.get(initialValues, 'values', {});
    const { questionIds } = options;
    useEffect(() => {
        dispatch(getTitleQuestions(id, type));

        questionIds?.map((item) => {

            dispatch(getOptionWitQuestionId(item));
        });
    }, [questionIds]);


    const submit = (values) => {
        let newArray = values.option?.map((item) => {
            let insideArray = [];
            let errorMessages = item.errorMessages;
            insideArray = item.dependentQuestion?.map((item1) => {
                let obj = {
                    questionId: ''
                };
                obj.questionId = item1.id;
                return obj;
            });
            let newObj = {
                dependentQuestion: [],
                questionId: '',
                validationTypeId: '',
                errorMessages
            };
            newObj.dependentQuestion = insideArray;
            newObj.questionId = item.question.id;
            if (item.questionOption) {
                newObj.questionOptionId = toNumber(item.questionOption.id);
            }
            newObj.validationTypeId = item.validationType.id;
            return newObj;
        });
        let objToSend = {
            questionOption: []
        };
        objToSend.questionOption = newArray;
        dispatch(sentQuestionOptionForEdit(id, objToSend));
        dispatch(Action.resetFormChange());

    };
    const readOnlyPermission = hasAccessPermission(RESOURCE_MAPPING.TITLE_QUESTION_OPTION_ASSOCIATION, ACTION_MAPPING.TITLE_QUESTION_OPTION_ASSOCIATION.READ_ONLY);

    return (
        <CardComponent>
            <LoadingCustomOverlay active={getOptionQuestions.requestInProgress}>
                <Form onSubmit={handleSubmit(submit)}>
                    <Grid container spacing={2} padding={2} direction='column' justify='space-between'>
                        <Grid item style={liteBoxShadow} xs={12} sm={12} md={12}>
                            <FieldArray disabled={readOnlyPermission} name="option" component={renderLabel} languages={languages} formattedResponse={formattedResponse} formValues={formValues} question={getTitleQuestionsOnly} change={change} dispatch={dispatch} validationType={validationType} questionOption={questionOption} optionQuestions={getOptionQuestions} />
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
        initialValues: state[STATE_REDUCER_KEY].optionTab
    }))(reduxForm({
        form: 'tileQuestionOptionForm',
        enableReinitialize: true,
        validate
    })(TitileQuestionOptionMap));


