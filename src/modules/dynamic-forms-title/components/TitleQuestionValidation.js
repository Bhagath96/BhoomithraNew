import React, { useEffect } from 'react';
import { Field, FieldArray, Form, reduxForm } from 'redux-form';
import { Components, Icons, I18n } from '../../../common/components';
import { useDispatch, useSelector, connect } from 'react-redux';
import { getQuestionTitleValidation, sentQuestionValidation, getQuestionValidationById, getTitleQuestions } from '../actions';
import { STATE_REDUCER_KEY } from '../constants';
import _ from '../../../utils/LodashUtils';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useParams } from 'react-router-dom';
import { titleQuestionValidation } from './validate';
import { withStyles } from '@material-ui/core/styles';
import { renderTextField, renderSimpleSelect, renderSelect } from '../../../utils/FormUtils';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider } from '@material-ui/core';
import { liteBoxShadow, renderCard } from '../../../assets/css/bhoom';
import * as Action from '../../common/actions';
import LoadingCustomOverlay from '../../../common/components/custom/LoadingOverlay';
import i18n from '../../../i18n';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';

const { Grid, Button, IconButton, CardHeader, CardContent, Card, Colors, CardComponent } = Components;
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

const { AddBoxTwoTone } = Icons;

const renderLabels = ({ fields, shortLabelDisplay, disabled,
    change, languages, title = i18n.t('label') }) => {
    fields.length < 1 && fields.push({});
    return (

        <Card>
            <CardHeader
                action={
                    <IconButton disabled={disabled} aria-label="Options" onClick={() => fields.push({})} className='addButton'>
                        <AddBoxTwoTone />
                    </IconButton>
                }
                title={title}
            />
            <CardContent style={renderCard.content}>
                {fields.map((member, index) => (
                    <Card key={index} style={{ ...renderCard.accordion, margin: '3px' }}>
                        <Accordion key={index} defaultExpanded={true} style={{ marginBottom: '10px' }} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Grid container alignItems='center'>
                                    <Grid item>
                                        <Typography>{i18n.t('label')}{index + 1}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={1} sm={1} md={1} >
                                    <IconButton disabled={disabled} aria-label="Options" onClick={() => fields.remove(index)}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Grid>
                            </AccordionSummary>
                            <Grid container spacing={2} key={index} style={renderCard.gridCenter}>
                                <Grid item xs={shortLabelDisplay ? 3 : 4} >
                                    <Field disabled={disabled} name={`${member}.langId`} label={I18n.t('language')} component={renderSimpleSelect} onChange={(value) =>
                                        change(`${member}.langId`, value.target.value)} >
                                        {
                                            _.get(languages, 'data', [])
                                        }
                                    </Field>
                                </Grid>
                                <Grid item xs={shortLabelDisplay ? 4 : 6} >
                                    <Field disabled={disabled} name={`${member}.label`} label={I18n.t('label')} component={renderTextField} />
                                </Grid>
                                {
                                    shortLabelDisplay ?
                                        <Grid item xs={3} >
                                            <Field disabled={disabled} name={`${member}.shortLabel`} label={I18n.t('short_label')} component={renderTextField} />
                                        </Grid> : null
                                }
                            </Grid>
                        </Accordion>
                    </Card>
                ))}
            </CardContent>
        </Card >
    );
};

const renderQuestionValidation = ({ fields = [{}], meta: { error }, questions, validationType, getTitleQuestionsOnly, languages, labelError, change, disabled }) => {
    fields.length < 1 && fields.push({});
    return (
        <ul style={{ padding: '10px' }}>
            <li style={renderCard.validations}>

                <CardHeader
                    action={
                        <IconButton disabled={disabled} aria-label="Options" onClick={() => fields.push({})} className='addButton'>
                            <AddBoxTwoTone />
                        </IconButton>
                    }
                    title={i18n.t('question_validation')}
                />

            </li>
            {fields?.map((labelItem, index) => (
                <div key={index} style={renderCard.div}>
                    <Grid container spacing={3} style={{ padding: '10px' }} justify='space-evenly'>
                        <Grid item xs={11} >
                            <Field disabled={disabled} name={`${labelItem}.question`} label={I18n.t('parent_question')} filterable component={renderSelect} onChange={(value) =>
                                value} >
                                {
                                    _.get(getTitleQuestionsOnly, 'data', [])
                                }
                            </Field>
                        </Grid>
                        <Grid item xs={1} style={{ padding: 0 }} alignContent='flex-end' justify='center'>
                            <IconButton disabled={disabled} className='deleteButton' style={{ top: '20px' }} onClick={() => fields.remove(index)}> <DeleteForeverIcon /></IconButton>
                        </Grid>
                        <Grid item xs={12} >
                            <Field disabled={disabled} name={`${labelItem}.dependentQuestion`} label={I18n.t('questions')} filterable multiple='multiple' component={renderSelect} onChange={(value) =>
                                value} >
                                {
                                    _.get(questions, 'data', [])
                                }
                            </Field>
                        </Grid>
                        <Grid item xs={12} >
                            <Field disabled={disabled} name={`${labelItem}.validationType`} label={I18n.t('question_validation')} component={renderSelect} onChange={(value) =>
                                value} >
                                {
                                    _.get(validationType, 'data', [])
                                }
                            </Field>
                        </Grid>
                        <Divider style={renderCard.divider} />
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

function TitleQuestionValidation(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { handleSubmit, submitting, change } = props;
    let type = 'dropdown';
    const { languages } = useSelector(state => state[STATE_REDUCER_KEY]);
    useEffect(() => {

        dispatch(getTitleQuestions(id, type));
        dispatch(getQuestionTitleValidation());
        if (id) {
            dispatch(getQuestionValidationById(id));
        }

    }, []);
    const validationType = useSelector(state => state[STATE_REDUCER_KEY].titleQuestionValidation);
    const getTitleQuestionsOnly = useSelector(state => state[STATE_REDUCER_KEY].getTitleQuestionsOnly);

    const submit = (values) => {
        change('type', 1);
        values.type = 1;
        let newArray = values.questionValidation?.map((item) => {
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
                dependentQuestions: [],
                questionId: '',
                validationTypeId: '',
                errorMessages
            };
            newObj.dependentQuestions = insideArray;
            newObj.questionId = item.question.id;
            newObj.validationTypeId = item.validationType.id;
            return newObj;
        });
        let objToSend = {
            titleQuestionValidations: []
        };
        objToSend.titleQuestionValidations = newArray;
        dispatch(sentQuestionValidation(id, objToSend));
        dispatch(Action.resetFormChange());
    };
    const readOnlyPermission = hasAccessPermission(RESOURCE_MAPPING.TITLE_QUESTION_VALIDATION, ACTION_MAPPING.TITLE_QUESTION_VALIDATION.READ_ONLY);

    return (
        <CardComponent>
            <LoadingCustomOverlay active={getTitleQuestionsOnly.requestInProgress}>
                <Form onSubmit={handleSubmit(submit)}>
                    <Grid container spacing={2} padding={2} direction='column' justify='space-between'>
                        <Grid item xs={12} sm={12} md={12} style={liteBoxShadow} >
                            <FieldArray disabled={readOnlyPermission} name="questionValidation" component={renderQuestionValidation} questions={getTitleQuestionsOnly} validationType={validationType} change={change} languages={languages} getTitleQuestionsOnly={getTitleQuestionsOnly} />
                        </Grid>
                        {!readOnlyPermission && <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <Button type="submit" disabled={submitting} >{I18n.t('submit')}</Button>
                        </Grid>}
                    </Grid>
                </Form>
            </LoadingCustomOverlay>
        </CardComponent>
    );
}

export default
    connect(state => ({
        initialValues: state[STATE_REDUCER_KEY].titleQuestionValidationTab
    }))(reduxForm({
        form: 'titleQuestionValidationForm',
        enableReinitialize: true,
        validate: titleQuestionValidation
    })(TitleQuestionValidation));
