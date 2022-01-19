import React, { useEffect, useState } from 'react';
import { Field, Form, reduxForm, FieldArray } from 'redux-form';
import { useDispatch, useSelector, connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeStyles, Components, Icons, I18n } from '../../../common/components';
import _ from '../../../utils/LodashUtils';
import { renderTextField, renderSimpleSelect, renderSelect } from '../../../utils/FormUtils';
import { getKeyByValue } from '../../../utils/ApiUtils';
import validate from './validate';
import * as Actions from '../actions';
import { TYPE, VALIDATION, FORM_NAME, STATE_REDUCER_KEY, OPTION_TYPES } from '../constants';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { renderCard, liteBoxShadow } from '../../../assets/css/bhoom';
import * as Action from '../../common/actions';
import LoadingCustomOverlay from '../../../common/components/custom/LoadingOverlay';
import MuiIconPicker from '../../../common/components/custom/mui-icon-picker/MuiIconPicker';
import { getEmptyPicky } from '../../../utils/CommonUtils';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';

const { AddBoxTwoTone, DeleteForeverIcon } = Icons;
const { Grid, Button, IconButton, CardHeader, CardContent, Card, CardComponent, Colors } = Components;

const excludeFromDefault = [getKeyByValue(VALIDATION, VALIDATION.IS_DECIMAL)];

const getValidationTypes = (type, allValidations) => {
    if (_.get(type, 'id', '') !== getKeyByValue(TYPE, TYPE.DIGIT)) {
        return _.filter(allValidations, (o) => !excludeFromDefault.includes(o.id));
    } else {
        return allValidations;
    }
};
const Accordion = withStyles({
    root: {
        boxShadow: 'none',
        '&:not(:last-child)': {
        },
        borderBottom: 0,
        '&:before': {
            display: 'none'
        },
        '&$expanded': {
            margin: 'auto'
        }
    },
    expanded: {}
})(MuiAccordion);
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

const renderLabels = ({ fields, shortLabelDisplay, readOnlyPermission,
    meta: { error },
    change, languages, title }) => {
    return (
        <Card style={renderCard.options} >
            <CardHeader
                action={
                    <IconButton disabled={readOnlyPermission} className='addButton' aria-label="Options" onClick={() => fields.push({})}>
                        <AddBoxTwoTone />
                    </IconButton>
                }
                title={title}
            />
            <CardContent style={renderCard.content}>
                {fields.map((member, index) => (
                    <Card key={index} style={renderCard.accordion}>
                        <Accordion defaultExpanded={true} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Grid container alignItems='center'>
                                    <Grid item>
                                        <Typography>{`${I18n.t('label')} ${index + 1}`}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={1} sm={1} md={1} >
                                    <IconButton disabled={readOnlyPermission} aria-label="Options" onClick={() => fields.remove(index)}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Grid>
                            </AccordionSummary>
                            <Grid container spacing={2} key={index} style={renderCard.gridCenter}>
                                <Grid item xs={shortLabelDisplay ? 3 : 4} >
                                    <Field disabled={readOnlyPermission} name={`${member}.langId`} label={I18n.t('language')} component={renderSimpleSelect} onChange={(value) =>
                                        change(`${member}.langId`, value.target.value)} >
                                        {
                                            _.get(languages, 'data', [])
                                        }
                                    </Field>
                                </Grid>
                                <Grid item xs={shortLabelDisplay ? 4 : 6} >
                                    <Field disabled={readOnlyPermission} name={`${member}.label`} label={I18n.t('label')} component={renderTextField} />
                                </Grid>
                                {
                                    shortLabelDisplay ?
                                        <Grid item xs={3} >
                                            <Field disabled={readOnlyPermission} name={`${member}.shortLabel`} label={I18n.t('short_label')} component={renderTextField} />
                                        </Grid> : null
                                }
                                {/* </AccordionDetails> */}
                            </Grid>
                        </Accordion>
                    </Card>
                ))}
                {error && <small style={{ color: 'red' }}>{error}</small>}
            </CardContent>
        </Card >
    );
};

const onIconPick = (icon, change, member) => {
    change(`${member}.icon1`, icon);
};
const renderOptions = ({ fields, labelError, readOnlyPermission,
    // meta: { touched, error, submitFailed },
    change, data = {} }) => {
    const { ListDataSourceByIDForCreate: { data: ListDataSourceByIDForCreateList } } = useSelector(state => state[STATE_REDUCER_KEY]);
    let { languages = {}, type = '', icons } = data;
    return <Card style={{ ...renderCard.options, overflow: 'visible' }}>
        <CardHeader
            action={
                <IconButton disabled={readOnlyPermission} className='addButton' aria-label="Options" onClick={() => fields.push({})}>
                    <AddBoxTwoTone />
                </IconButton>
            }
            title={I18n.t('add_new_option')}
        />
        <CardContent style={renderCard.content}>
            {fields.map((member, index) => (
                <Card key={index} style={{ ...renderCard.accordion, overflow: 'visible' }}>

                    <Accordion defaultExpanded={true} >

                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Grid container alignItems='center'>
                                <Grid item>
                                    <Typography>{`${I18n.t('option')} ${index + 1}`}</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1} >
                                <IconButton disabled={readOnlyPermission} aria-label="Options" onClick={() => fields.remove(index)}>
                                    <DeleteForeverIcon />
                                </IconButton>
                            </Grid>
                        </AccordionSummary>
                        <CardHeader>
                            <IconButton disabled={readOnlyPermission} aria-label="Options" onClick={() => fields.remove(index)}>
                                <DeleteForeverIcon />
                            </IconButton>
                        </CardHeader>
                        {/* <AccordionDetails> */}
                        <CardContent style={renderCard.content}>
                            <Grid container key={index} spacing={2} direction='column' >
                                {type === getKeyByValue(TYPE, TYPE.OPTION_WITH_ICON) &&
                                    <>
                                        <Grid item xs={12} sm={12} md={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <MuiIconPicker onIconPick={(icon) => onIconPick(icon, change, member)} defaultIcon={icons[index]?.icon1} />
                                        </Grid>
                                    </>
                                }
                                <Grid item xs={12} sm={12} md={12} >
                                    <FieldArray readOnlyPermission={readOnlyPermission} name={`${member}.label`} labelError={labelError} component={renderLabels} languages={languages} change={change} title={I18n.t('label')} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Grid container spacing={2} justify='space-between' alignItems='center' style={{ padding: '15px 20px' }}>
                                        <Grid item xs={6} >
                                            <Field disabled={readOnlyPermission} name={`${member}.sortOrder`} label={I18n.t('sort_order')} type="number" component={renderTextField} />
                                        </Grid>
                                        <Grid item xs={6} >
                                            <Field disabled={readOnlyPermission} name={`${member}.value`} label={I18n.t('value')} type="number" component={renderTextField} />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} style={{ padding: '15px 20px', marginBottom: '20px', maxHeight: '100%', overflow: 'scrollbars' }} justify='space-between' alignItems='center'>
                                        <Grid item xs={6} spacing={2}>
                                            <Field disabled={readOnlyPermission} name={`${member}.dataSourceDataId`} label={I18n.t('data_source_data')} placeholder={I18n.t('drop_down_select')} component={renderSelect} style={{ position: 'absolute' }}>
                                                {
                                                    [getEmptyPicky(), ...ListDataSourceByIDForCreateList]
                                                }
                                            </Field>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                        {/* </AccordionDetails> */}
                    </Accordion>
                </Card>
            ))}
        </CardContent>
        {/* </AccordionDetails>
            </Accordion> */}
    </Card >
        ;
};


const renderValidations = ({ fields, labelOptionErrorInValidation, readOnlyPermission,
    // meta: { touched, error, submitFailed },
    change, data = {} }) => {
    const { languages, validationList } = data;
    return <>
        <Card style={renderCard.validations}>
            <CardHeader
                action={
                    <IconButton disabled={readOnlyPermission} className='addButton' aria-label="Validations" onClick={() => fields.push({})}>
                        <AddBoxTwoTone />
                    </IconButton>
                }
                title={I18n.t('add_validation')}
            />
            <CardContent style={renderCard.content}>
                {fields.map((member, index) => (
                    <Card style={renderCard.accordion} key={index} >
                        <Accordion defaultExpanded={true}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Grid container alignItems='center'>
                                    <Grid item>
                                        <Typography>{`${I18n.t('validation')} ${index + 1}`}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={1} sm={1} md={1} >
                                    <IconButton disabled={readOnlyPermission} aria-label="Options" onClick={() => fields.remove(index)}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Grid>

                            </AccordionSummary>
                            {/* <AccordionDetails> */}
                            <CardHeader // title={`Validation ${index + 1}`}
                            />
                            <Card style={{ padding: '10px', paddingBottom: '66px' }}>
                                <CardContent style={{ paddingBottom: '0px', padding: '10px' }}>
                                    <Grid container spacing={2} key={index} >
                                        <Grid item xs={12} sm={12} md={12} padding={1}>
                                            <Field disabled={readOnlyPermission} name={`${member}.type`} label={I18n.t('select_validation')} component={renderSelect} filterable onChange={(value) =>
                                                change(`${member}.typeId`, value.pk)} >
                                                {
                                                    validationList || []
                                                }
                                            </Field>
                                        </Grid>
                                    </Grid>

                                </CardContent>
                                <FieldArray readOnlyPermission={readOnlyPermission} name={`${member}.errorMessage`} component={renderLabels} labelOptionErrorInValidation={labelOptionErrorInValidation} languages={languages} change={change} title={I18n.t('error_label')} />
                            </Card>
                            {/* </AccordionDetails> */}
                        </Accordion>
                    </Card>
                ))}
            </CardContent>
        </Card >
    </>;
};
const checkIfDuplicateExists = (w) => {
    return new Set(w).size !== w.length;
};

const checkIfDuplicateExistsLabel = (w) => {
    return new Set(w).size !== w.length;
};

const GenerateQuestion = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { handleSubmit } = props;
    const { id = null } = useParams();
    const { change } = props;

    const { ListDataSourceByIDForCreate: { data: ListDataSourceByIDForCreateList, requestInProgress = false }, languages, questionTypes: { data = [] } = {}, ListDataSource: { data: ListDataSourceData = [] }, validationList, keyList: { data: keys = [] } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
    const initialValues = useSelector(state => _.get(state, `form.${FORM_NAME}`, {}));
    const formValues = _.get(initialValues, 'values', {});
    const { type = {}, option = [] } = formValues;
    const storeData = useSelector(state => state[STATE_REDUCER_KEY].generateQuestion.data);
    let dataSourceID = storeData.dataSource?.id;

    let
        childGroups = {},
        otherOptions = {};

    const paramsData = { childGroups, languages, otherOptions };
    useEffect(() => {
        dispatch(Actions.fetchLanguagesForQuestions());
        dispatch(Actions.fetchQuestionTypes());
        dispatch(Actions.fetchQuestionValidationTypes());
        dispatch(Actions.fetchQuestionKeys());
        dispatch(Actions.fetchDataSource());
        if (id !== null) {
            props.change('questionId', id);
            dispatch(Actions.fetchQuestionById(id));

        } else {
            dispatch(Actions.resetEditGenerateQuestions());

        }
    }, []);

    useEffect(() => {
        dataSourceID ? dispatch(Actions.fetchDataSourceByID(dataSourceID)) : '';
        dataSourceID ? dispatch(Actions.fetchDataSourceByIDInCreate(dataSourceID)) : '';
    }, [dataSourceID]);

    const [labelError, SetLabelError] = useState('');
    const [labelOptionError, setLabelOptionError] = useState('');
    const [labelOptionErrorInValidation, setLabelOptionErrorInValidation] = useState('');
    const getPreOptions = (value) => {
        const { type: storeType = {}, option: storeOption = [] } = storeData;
        if (OPTION_TYPES.includes(type.id) && OPTION_TYPES.includes(value.id)) {
            return option;
        } else {
            if (OPTION_TYPES.includes(storeType.id) && OPTION_TYPES.includes(value.id)) {
                return storeOption;
            } else {
                return [];
            }
        }
    };
    const submit = (values) => {
        let duplicateExistInOptionLabelValidation = false;
        let duplicateExistInOptionLabel = false;
        let errorFlag = false;
        let errorFlagForValidation = false;
        let validationArray = null;
        let optionArray = null;
        if (values.validation?.length > 0) {
            validationArray = values.validation?.map((item) => {
                let arrayForLabelInsideOptionValiidation = [];
                let objectTopush = {
                    typeId: 0,
                    errorMessage: []
                };
                if (item.type) {
                    objectTopush.typeId = item.type.pk;
                }
                objectTopush.errorMessage = item.errorMessage;
                objectTopush.errorMessage?.forEach((items) => {
                    if (items.langId) {
                        arrayForLabelInsideOptionValiidation.push(Number(items.langId));
                    }
                    if (arrayForLabelInsideOptionValiidation.length > 0) {
                        duplicateExistInOptionLabelValidation = checkIfDuplicateExistsLabel(arrayForLabelInsideOptionValiidation);
                    }
                    if (duplicateExistInOptionLabelValidation) {
                        errorFlagForValidation = true;
                        setLabelOptionErrorInValidation(I18n.t('language_should_not_be_same'));

                    }
                });
                return objectTopush;
            });
        }
        if (values.option?.length > 0) {
            optionArray = values.option?.map((item) => {
                let arrayForLabelInsideOption = [];
                let objectTopush = {
                    value: Number(item.value),
                    sortOrder: item.sortOrder,
                    label: item.label || []
                };
                if (item.icon1) {
                    objectTopush.icon1 = item.icon1;
                }
                let currentOptionDataSourceId = _.get(values, 'dataSource.id', null);
                if (currentOptionDataSourceId !== null) {
                    objectTopush.dataSourceId = currentOptionDataSourceId;
                }
                let currentOptionDataSourceDataId = _.get(item, 'dataSourceDataId.id', null);
                if (currentOptionDataSourceDataId !== null) {
                    objectTopush.dataSourceDataId = currentOptionDataSourceDataId;
                }
                objectTopush.label?.forEach((currentLabel) => {
                    if (currentLabel.langId) {
                        arrayForLabelInsideOption.push(Number(currentLabel.langId));
                    }
                    if (arrayForLabelInsideOption.length > 0) {
                        duplicateExistInOptionLabel = checkIfDuplicateExists(arrayForLabelInsideOption);
                    }
                    if (duplicateExistInOptionLabel) {
                        errorFlag = true;
                        setLabelOptionError(I18n.t('language_should_not_be_same'));
                    }
                });
                return objectTopush;
            });
        }

        let objectToSent = {
            validation: validationArray,
            label: []
        };
        let questionName = _.get(values, 'name', null);
        if (questionName !== null) {
            objectToSent.name = questionName;
        }
        let questionKey = _.get(values, 'key.id', null);
        if (questionKey !== null) {
            objectToSent.key = questionKey;
        }
        let questionType = _.get(values, 'type.pk', null);
        if (questionType !== null) {
            objectToSent.typeId = questionType;
        }
        let questionDataSourceId = _.get(values, 'dataSource.id', null);
        if (questionDataSourceId !== null) {
            objectToSent.dataSourceId = questionDataSourceId;
        }
        let questionDataSourceDataId = _.get(values, 'dataSourceDataId.id', null);
        if (questionDataSourceDataId !== null) {
            objectToSent.dataSourceDataId = questionDataSourceDataId;
        }
        if (Array.isArray(optionArray) && optionArray.length) {
            objectToSent.option = optionArray;
        } else {
            objectToSent.option = [];
        }
        if (values.label?.length > 0) {
            objectToSent.label = values.label;
        }
        if (!values.label || values.label.length === 0) {
            SetLabelError(I18n.t('no_label_error'));
        } else {
            SetLabelError('');
            if (id === null && (!errorFlag) && (!errorFlagForValidation)) {
                setLabelOptionError('');
                setLabelOptionErrorInValidation('');
                dispatch(Actions.saveQuestion(objectToSent));
            } else {
                if (id && !errorFlag && !errorFlagForValidation) {
                    setLabelOptionError('');
                    setLabelOptionErrorInValidation('');
                    dispatch(Actions.updateQuestion(id, objectToSent));
                }
            }
        }
        dispatch(Action.resetFormChange());
    };

    const readOnlyPermission = hasAccessPermission(RESOURCE_MAPPING.QUESTION_DETAILS, ACTION_MAPPING.QUESTION_DETAILS.READ_ONLY);

    return (
        <CardComponent>
            <LoadingCustomOverlay active={requestInProgress}>

                <Form onSubmit={handleSubmit(submit)} >
                    <Grid style={renderCard.form} container spacing={2} padding={2} justify='space-between'>
                        <Grid item xs={6} >
                            <Field disabled={readOnlyPermission} name='name' label={I18n.t('name')} type='text' component={renderTextField} />
                        </Grid>
                        <Grid item xs={6} >
                            <Field disabled={readOnlyPermission} name="key" label={I18n.t('key')} component={renderSelect}>
                                {
                                    [getEmptyPicky(), ...keys]
                                }
                            </Field>
                        </Grid>

                        <Grid item xs={6} sm={6} md={6} >
                            <Field disabled={readOnlyPermission} name="dataSource" label={I18n.t('data_source')} component={renderSelect} onChange={(value) => {
                                if (value.id) {
                                    dispatch(Actions.fetchDataSourceByIDInCreate(value.id));
                                }
                                change('dataSourceDataId', null);
                                option.forEach((item, index) => change(`option[${index}].dataSourceDataId`, null));
                            }}>
                                {
                                    [getEmptyPicky(), ...ListDataSourceData]
                                }
                            </Field>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <Field disabled={readOnlyPermission} name="dataSourceDataId" label={I18n.t('data_source_data')} component={renderSelect}>
                                {
                                    [getEmptyPicky(), ...ListDataSourceByIDForCreateList]
                                }
                            </Field>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} >
                                <Field disabled={readOnlyPermission} name="type" label={I18n.t('type')} component={renderSelect} filterable onChange={(value) => {
                                    change('typeId', value.pk);
                                    change('option', getPreOptions(value));
                                }
                                }
                                >
                                    {
                                        data || []
                                    }
                                </Field>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} padding={2} direction='column' justify='space-between' >
                        <Grid item xs={12} sm={12} md={12} style={{ ...liteBoxShadow }} >
                            <FieldArray readOnlyPermission={readOnlyPermission} name='label' component={renderLabels} shortLabelDisplay={true} languages={languages} change={change} title={I18n.t('label')} />
                            {
                                labelError ? <small style={{ color: 'red' }}>{labelError}</small> : <small></small>
                            }
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} style={{ ...liteBoxShadow }} >
                            <FieldArray readOnlyPermission={readOnlyPermission} name="validation" labelOptionErrorInValidation={labelOptionErrorInValidation} component={renderValidations} change={change} data={{ languages, validationList: getValidationTypes(_.get(formValues, 'type', {}), _.get(validationList, 'data', [])) }} />
                        </Grid>

                    </Grid>
                    {
                        ((_.get(formValues, 'type.id', '') === getKeyByValue(TYPE, TYPE.OPTION)) || (_.get(formValues, 'type.id', '') === getKeyByValue(TYPE, TYPE.OPTION_WITH_ICON)) || (_.get(formValues, 'type.id', '') === getKeyByValue(TYPE, TYPE.MULTI_DROPDOWN)) || (_.get(formValues, 'type.id', '') === getKeyByValue(TYPE, TYPE.CHECKBOX)) || (_.get(formValues, 'type.id', '') === getKeyByValue(TYPE, TYPE.DROPDOWN))) &&
                        <Grid container spacing={2} padding={2} direction='column' justify='space-between' >
                            <Grid item xs={12} sm={12} md={12} style={{ ...liteBoxShadow }} >
                                <FieldArray readOnlyPermission={readOnlyPermission} name="option" id={id ? id : null} labelError={labelOptionError} component={renderOptions} change={change} data={{ ...paramsData, type: _.get(formValues, 'type.id', ''), icons: _.get(formValues, 'option', []) }} />
                            </Grid>
                        </Grid>
                    }
                    {!readOnlyPermission && <Grid container >
                        <Grid item xs={12} className={classes.submit}>
                            <Button size="large" type="submit">{I18n.t('submit')}</Button>
                        </Grid>
                    </Grid>}
                </Form >

            </LoadingCustomOverlay>
        </CardComponent>
    );
};

export default
    connect(state => ({
        initialValues: state[STATE_REDUCER_KEY].generateQuestion.data
    }))(reduxForm({
        form: FORM_NAME,
        enableReinitialize: true,
        validate
    })(GenerateQuestion));
